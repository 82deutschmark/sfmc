import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { OnboardingModal } from "@/components/game/OnboardingModal";
import { Header } from "@/components/game/Header";
import { MissionSelector } from "@/components/game/MissionSelector";
import { Timer } from "@/components/game/Timer";
import { InteractiveGrid } from "@/components/game/InteractiveGrid";
import { ResultModal } from "@/components/game/ResultModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SPACE_EMOJIS } from "@/constants/spaceEmojis";
import type { Mission, Player } from "@shared/schema";
import type { GameResult, MissionExample, EmojiSet } from "@/types/game";

export default function MissionControl() {
  // State management
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("🛡️ O₂ Sensor Check");
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [playerGrid, setPlayerGrid] = useState<string[][]>([]);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Create default player on load
  const createPlayerMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/players", { username: "cadet" });
      return response.json();
    },
    onSuccess: (player: Player) => {
      setCurrentPlayer(player);
    },
  });

  // Fetch missions
  const { data: missions = [] } = useQuery<Mission[]>({
    queryKey: ["/api/missions"],
    enabled: !!currentPlayer,
  });

  // Validate solution mutation
  const validateSolutionMutation = useMutation({
    mutationFn: async ({ playerId, missionId, solution, timeElapsed }: {
      playerId: number;
      missionId: string;
      solution: string[][];
      timeElapsed?: number;
    }) => {
      const response = await apiRequest("POST", `/api/players/${playerId}/validate-solution`, {
        missionId,
        solution,
        timeElapsed,
      });
      return response.json();
    },
    onSuccess: (result: GameResult) => {
      setGameResult(result);
      setShowResult(true);
      setIsTimerActive(false);
      
      // Refresh player data
      if (result.correct && currentPlayer) {
        queryClient.invalidateQueries({ queryKey: [`/api/players/${currentPlayer.id}`] });
      }
    },
  });

  // Initialize player on mount
  useEffect(() => {
    if (!currentPlayer) {
      createPlayerMutation.mutate();
    }
  }, []);

  // Fetch updated player data
  const { data: updatedPlayer } = useQuery<Player>({
    queryKey: [`/api/players/${currentPlayer?.id}`],
    enabled: !!currentPlayer,
  });

  const activePlayer = updatedPlayer || currentPlayer;

  const handleSelectMission = (mission: Mission) => {
    setCurrentMission(mission);
    setStartTime(Date.now());
    setIsTimerActive(!!mission.timeLimit);
    
    // Initialize empty grid
    const emptyGrid = Array(mission.gridSize).fill(null).map(() => 
      Array(mission.gridSize).fill(SPACE_EMOJIS[mission.emojiSet as EmojiSet][0])
    );
    setPlayerGrid(emptyGrid);
  };

  const handleSolveMission = () => {
    if (!currentMission || !activePlayer || !startTime) return;
    
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    
    validateSolutionMutation.mutate({
      playerId: activePlayer.id,
      missionId: currentMission.id,
      solution: playerGrid,
      timeElapsed,
    });
  };

  const handleTimeUp = () => {
    // Auto-submit when time runs out
    if (currentMission && activePlayer) {
      handleSolveMission();
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setGameResult(null);
    setCurrentMission(null);
    setPlayerGrid([]);
    setStartTime(null);
    setIsTimerActive(false);
  };

  const renderExampleGrid = (grid: string[][], title: string) => (
    <div>
      <div className="text-xs text-slate-400 mb-2 text-center">{title}</div>
      <div 
        className="grid gap-1 bg-slate-800 p-2 rounded"
        style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 1}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded text-lg"
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );

  if (!activePlayer) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading Mission Control...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px"
          }}
        />
      </div>

      <OnboardingModal 
        open={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />

      <Header player={activePlayer} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!currentMission ? (
          <MissionSelector
            player={activePlayer}
            missions={missions}
            onSelectMission={handleSelectMission}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        ) : (
          <div className="space-y-6">
            {/* Active Mission Panel */}
            <Card className="bg-slate-800 border-cyan-400">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-cyan-400 mb-1">
                      MISSION {currentMission.id}: {currentMission.title}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Difficulty: <span className="text-green-400">{currentMission.difficulty}</span> • 
                      Grid: <span className="text-amber-400">{currentMission.gridSize}×{currentMission.gridSize}</span>
                      {currentMission.timeLimit && (
                        <span> • Time Limit: <span className="text-red-400">{currentMission.timeLimit}s</span></span>
                      )}
                    </p>
                  </div>
                  
                  {currentMission.timeLimit && (
                    <Timer
                      initialTime={currentMission.timeLimit}
                      onTimeUp={handleTimeUp}
                      isActive={isTimerActive}
                    />
                  )}
                </div>
                
                <div className="bg-slate-900 border border-slate-600 rounded p-4 mb-6">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <span className="text-amber-400 font-semibold">Mission Brief:</span> 
                    {currentMission.description}
                  </p>
                </div>
                
                {/* Example Transformations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {(currentMission.examples as MissionExample[]).map((example, index) => (
                    <div key={index} className="bg-slate-900 border border-slate-600 rounded p-4">
                      <h3 className="text-green-400 font-semibold mb-3 flex items-center">
                        <i className="fas fa-eye mr-2"></i>
                        EXAMPLE {index + 1}
                      </h3>
                      
                      <div className="flex items-center justify-center space-x-4">
                        {renderExampleGrid(example.input, "INPUT")}
                        <div className="text-cyan-400 text-xl">→</div>
                        {renderExampleGrid(example.output, "OUTPUT")}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Interactive Test Grid */}
                <div className="bg-slate-900 border border-amber-400 rounded p-4">
                  <h3 className="text-amber-400 font-semibold mb-3 flex items-center">
                    <i className="fas fa-crosshairs mr-2"></i>
                    YOUR MISSION: SOLVE THE PATTERN
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-8 mb-6">
                    <div>
                      {renderExampleGrid(currentMission.testInput as string[][], "TEST INPUT")}
                    </div>
                    
                    <div className="text-cyan-400 text-2xl">→</div>
                    
                    <div>
                      <div className="text-xs text-slate-400 mb-2 text-center">YOUR OUTPUT</div>
                      <InteractiveGrid
                        gridSize={currentMission.gridSize}
                        emojiSet={currentMission.emojiSet as EmojiSet}
                        onGridChange={setPlayerGrid}
                        disabled={validateSolutionMutation.isPending}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      className="bg-amber-400 hover:bg-yellow-500 text-slate-900 border-amber-400"
                    >
                      <i className="fas fa-lightbulb mr-2"></i>HINT
                    </Button>
                    <Button
                      onClick={handleSolveMission}
                      disabled={validateSolutionMutation.isPending}
                      className="bg-green-400 hover:bg-green-500 text-slate-900"
                    >
                      <i className="fas fa-check mr-2"></i>EXECUTE MISSION
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCloseResult()}
                      className="bg-red-500 hover:bg-red-600 text-slate-50 border-red-500"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>BACK TO QUEUE
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <ResultModal
        open={showResult}
        onClose={handleCloseResult}
        result={gameResult}
      />
    </div>
  );
}
