// Mission Control ARC-AGI Task Categories and Flavor Text
// Based on fluid intelligence testing principles from the ARC-AGI challenge
// Designed for children's space mission simulator

interface TaskDefinition {
  id: string;
  name: string;
  transformationType: string;
  flavorText: string;
  briefingText: string;
  successText: string;
}

interface TaskCategory {
  category: string;
  description: string;
  icon: string;
  tasks: TaskDefinition[];
}

// SENSORS Category - Detection and pattern recognition systems
const sensorsCategory: TaskCategory = {
  category: "sensors",
  description: "Spacecraft sensor array calibration and pattern detection",
  icon: "🛰️",
  tasks: [
    {
      id: "sensors_rotation_90",
      name: "Radar Array Calibration",
      transformationType: "Rotation (90°)",
      flavorText: "Mission Control, our radar array needs recalibration after the orbital maneuver. The sensor readings have been rotated 90 degrees clockwise from their standard orientation.",
      briefingText: "Previous radar sweeps show these patterns when functioning correctly. Current malfunction is rotating all readings. Analyze the examples and predict what the corrected sensor display should show.",
      successText: "Excellent! Radar array is now properly calibrated and tracking objects correctly."
    },
    {
      id: "sensors_pattern_completion",
      name: "Stellar Navigation Map",
      transformationType: "Pattern completion",
      flavorText: "Our star chart database is corrupted - several key navigation patterns are incomplete. We need to restore the missing stellar formations for safe passage.",
      briefingText: "Historical star charts show complete constellation patterns. Current corrupted data has gaps. Based on the intact examples, determine what the missing pattern should be.",
      successText: "Navigation computer updated! We have a clear path through the asteroid field."
    },
    {
      id: "sensors_object_counting",
      name: "Debris Field Assessment",
      transformationType: "Object counting",
      flavorText: "Space debris is interfering with our sensors. We need an accurate count of objects in each grid sector to plan our trajectory safely.",
      briefingText: "Previous scans show object counts per sector. Current sector shows similar debris patterns. Count the objects in the new sector based on the pattern recognition from previous scans.",
      successText: "Debris field mapped successfully! Safe navigation route calculated."
    },
    {
      id: "sensors_color_mapping",
      name: "Thermal Signature Analysis", 
      transformationType: "Color mapping",
      flavorText: "Thermal sensors are detecting heat signatures from unknown objects. Different colors represent different temperature ranges - we need to decode the thermal pattern.",
      briefingText: "Previous thermal scans show how temperature signatures translate between sensor modes. New contact detected. Apply the same thermal mapping to identify the object type.",
      successText: "Thermal signature decoded! Object identified as friendly research probe."
    },
    {
      id: "sensors_reflection_horizontal",
      name: "Satellite Mirror Array",
      transformationType: "Reflection (horizontal)",
      flavorText: "Our communication satellite's mirror array has been damaged by micro-meteorites. The reflection pattern needs correction for optimal signal relay.",
      briefingText: "Working mirror arrays show proper reflection patterns. Damaged array shows distorted reflections. Determine the correct horizontal reflection pattern for signal restoration.",
      successText: "Mirror array realigned! Communication signal strength at maximum."
    },
    // Placeholders for remaining 5 sensor tasks
    {
      id: "sensors_translation",
      name: "Sensor Array Positioning",
      transformationType: "Translation (moving objects)",
      flavorText: "[PLACEHOLDER] Sensor positioning system needs recalibration",
      briefingText: "[PLACEHOLDER] Translation movement patterns",
      successText: "[PLACEHOLDER] Sensors repositioned correctly"
    },
    {
      id: "sensors_scaling",
      name: "Detection Range Calibration", 
      transformationType: "Scaling (resize objects)",
      flavorText: "[PLACEHOLDER] Detection range scaling issue",
      briefingText: "[PLACEHOLDER] Scale transformation patterns",
      successText: "[PLACEHOLDER] Detection range optimized"
    },
    {
      id: "sensors_pattern_extension",
      name: "Sensor Grid Extension",
      transformationType: "Pattern extension", 
      flavorText: "[PLACEHOLDER] Expanding sensor coverage area",
      briefingText: "[PLACEHOLDER] Pattern extension logic",
      successText: "[PLACEHOLDER] Sensor grid expanded successfully"
    },
    {
      id: "sensors_and_operation",
      name: "Multi-Sensor Fusion",
      transformationType: "AND operations",
      flavorText: "[PLACEHOLDER] Combining multiple sensor inputs",
      briefingText: "[PLACEHOLDER] Logical AND operation patterns",
      successText: "[PLACEHOLDER] Sensor fusion completed"
    },
    {
      id: "sensors_shape_detection",
      name: "Object Shape Analysis", 
      transformationType: "Shape detection",
      flavorText: "[PLACEHOLDER] Unknown object shape identification",
      briefingText: "[PLACEHOLDER] Shape recognition patterns",
      successText: "[PLACEHOLDER] Object shape classified"
    }
  ]
};

// FUEL Category - Resource management and pattern optimization
const fuelCategory: TaskCategory = {
  category: "fuel",
  description: "Fuel system optimization and resource allocation patterns",
  icon: "⛽",
  tasks: [
    {
      id: "fuel_pattern_repetition",
      name: "Fuel Injection Sequence",
      transformationType: "Pattern repetition",
      flavorText: "The fuel injection system requires a precise repeating pattern to maintain optimal engine performance during our Mars transit burn.",
      briefingText: "Engine diagnostics show successful fuel injection patterns from previous burns. Current burn sequence needs the same pattern repeated. Determine the correct injection timing.",
      successText: "Fuel injection optimized! Engine running at peak efficiency for Mars transit."
    },
    {
      id: "fuel_grid_splitting", 
      name: "Fuel Tank Compartmentalization",
      transformationType: "Grid splitting (quadrant)",
      flavorText: "Emergency protocols require dividing our main fuel tank into separate compartments to prevent total loss in case of hull breach.",
      briefingText: "Previous tank configurations show proper compartment divisions. Main tank needs emergency compartmentalization. Apply the same splitting pattern for safety.",
      successText: "Fuel tank compartmentalized! Emergency safety protocols now active."
    },
    {
      id: "fuel_sequence_prediction",
      name: "Consumption Rate Forecasting",
      transformationType: "Sequence prediction", 
      flavorText: "We need to predict fuel consumption for the upcoming deep space maneuvers. The pattern will help us plan our resource allocation.",
      briefingText: "Historical mission data shows fuel consumption patterns for similar maneuvers. Current mission profile follows similar trajectory. Predict the consumption sequence.",
      successText: "Fuel consumption forecast complete! Mission duration extended by optimal planning."
    },
    {
      id: "fuel_color_replacement",
      name: "Fuel Quality Monitoring",
      transformationType: "Color replacement",
      flavorText: "Fuel quality sensors use color codes to indicate contamination levels. We need to update the monitoring system with new quality standards.",
      briefingText: "Previous quality scans show color coding for fuel purity levels. New standards require color code updates. Apply the new color mapping system.",
      successText: "Fuel quality monitoring updated! All fuel reserves confirmed at optimal purity."
    },
    // Placeholders for remaining 6 fuel tasks  
    {
      id: "fuel_rotation_180",
      name: "Fuel Line Reconfiguration",
      transformationType: "Rotation (180°)",
      flavorText: "[PLACEHOLDER] Fuel distribution system needs 180-degree reconfiguration",
      briefingText: "[PLACEHOLDER] Pipeline rotation patterns",
      successText: "[PLACEHOLDER] Fuel lines reconfigured successfully"
    },
    {
      id: "fuel_object_grouping", 
      name: "Fuel Cell Organization",
      transformationType: "Object grouping",
      flavorText: "[PLACEHOLDER] Fuel cells need optimal grouping for efficiency",
      briefingText: "[PLACEHOLDER] Grouping optimization patterns", 
      successText: "[PLACEHOLDER] Fuel cells organized for maximum output"
    },
    {
      id: "fuel_grid_overlay",
      name: "Fuel System Integration",
      transformationType: "Grid overlay",
      flavorText: "[PLACEHOLDER] Integrating primary and backup fuel systems",
      briefingText: "[PLACEHOLDER] System overlay patterns",
      successText: "[PLACEHOLDER] Fuel systems integrated successfully"
    },
    {
      id: "fuel_or_operation",
      name: "Fuel Source Selection",
      transformationType: "OR operations", 
      flavorText: "[PLACEHOLDER] Selecting optimal fuel source from multiple options",
      briefingText: "[PLACEHOLDER] Logical OR operation patterns",
      successText: "[PLACEHOLDER] Optimal fuel source selected"
    },
    {
      id: "fuel_containment_relationship",
      name: "Fuel Containment Protocols",
      transformationType: "Containment relationships",
      flavorText: "[PLACEHOLDER] Ensuring proper fuel containment safety",
      briefingText: "[PLACEHOLDER] Containment pattern analysis",
      successText: "[PLACEHOLDER] Fuel containment protocols verified"
    },
    {
      id: "fuel_shape_combination",
      name: "Fuel Cell Configuration",
      transformationType: "Shape combination",
      flavorText: "[PLACEHOLDER] Combining fuel cell shapes for optimal storage",
      briefingText: "[PLACEHOLDER] Shape combination patterns",
      successText: "[PLACEHOLDER] Fuel cell configuration optimized"
    }
  ]
};

// NAVIGATION Category - Course plotting and spatial reasoning
const navigationCategory: TaskCategory = {
  category: "navigation",
  description: "Spacecraft navigation and trajectory calculations",
  icon: "🧭",
  tasks: [
    {
      id: "navigation_reflection_diagonal",
      name: "Gravity Assist Trajectory",
      transformationType: "Reflection (diagonal)",
      flavorText: "We're using Jupiter's gravity to slingshot toward Saturn. The trajectory reflection around the planet needs precise calculation for mission success.",
      briefingText: "Previous gravity assist maneuvers show successful reflection angles. Current Jupiter approach requires similar diagonal reflection. Calculate the optimal trajectory path.",
      successText: "Gravity assist maneuver calculated! We're on course for Saturn with 40% fuel savings."
    },
    {
      id: "navigation_spatial_inside_outside",
      name: "Asteroid Belt Navigation", 
      transformationType: "Inside/outside relationships",
      flavorText: "Navigation through the asteroid belt requires identifying safe zones inside and dangerous areas outside our planned corridor.",
      briefingText: "Previous belt transits show safe inside zones versus hazardous outside areas. Current path shows similar spatial patterns. Identify safe navigation zones.",
      successText: "Safe corridor identified! Navigation through asteroid belt will proceed without hazard."
    },
    {
      id: "navigation_translation_movement",
      name: "Orbital Correction Burns",
      transformationType: "Translation (moving objects)",
      flavorText: "Solar wind has pushed us off course. We need to calculate the precise translation movements to return to our planned orbital path.",
      briefingText: "Previous correction burns show movement patterns to restore proper trajectory. Current position drift follows similar pattern. Calculate the correction sequence.",
      successText: "Orbital corrections applied! We're back on the optimal flight path to our destination."
    },
    {
      id: "navigation_grid_merging",
      name: "Navigation Chart Synthesis",
      transformationType: "Grid merging",
      flavorText: "Multiple navigation charts from different probe missions need to be merged into one comprehensive map for our deep space expedition.",
      briefingText: "Individual probe charts show partial navigation data. Complete mission requires merged chart data. Combine the separate navigation grids properly.",
      successText: "Navigation charts merged! Complete stellar map available for deep space navigation."
    },
    // Placeholders for remaining 6 navigation tasks
    {
      id: "navigation_rotation_270",
      name: "Gyroscope Realignment", 
      transformationType: "Rotation (270°)",
      flavorText: "[PLACEHOLDER] Navigation gyroscope needs 270-degree realignment",
      briefingText: "[PLACEHOLDER] Gyroscope rotation patterns",
      successText: "[PLACEHOLDER] Navigation system realigned"
    },
    {
      id: "navigation_object_sorting",
      name: "Waypoint Organization",
      transformationType: "Object sorting",
      flavorText: "[PLACEHOLDER] Navigation waypoints need optimal sorting",
      briefingText: "[PLACEHOLDER] Waypoint sorting patterns",
      successText: "[PLACEHOLDER] Flight path optimized"
    },
    {
      id: "navigation_xor_operation", 
      name: "Route Conflict Resolution",
      transformationType: "XOR operations",
      flavorText: "[PLACEHOLDER] Resolving conflicting navigation routes",
      briefingText: "[PLACEHOLDER] Logical XOR operation patterns",
      successText: "[PLACEHOLDER] Navigation conflicts resolved"
    },
    {
      id: "navigation_proximity_relationship",
      name: "Hazard Proximity Alert",
      transformationType: "Proximity relationships", 
      flavorText: "[PLACEHOLDER] Monitoring proximity to navigation hazards",
      briefingText: "[PLACEHOLDER] Proximity pattern analysis",
      successText: "[PLACEHOLDER] Hazard proximity monitored"
    },
    {
      id: "navigation_rule_generalization",
      name: "Universal Navigation Protocol",
      transformationType: "Rule generalization",
      flavorText: "[PLACEHOLDER] Creating universal navigation rules",
      briefingText: "[PLACEHOLDER] Rule generalization patterns",
      successText: "[PLACEHOLDER] Navigation protocols standardized"
    },
    {
      id: "navigation_abstract_pattern",
      name: "Deep Space Navigation Logic",
      transformationType: "Abstract pattern recognition",
      flavorText: "[PLACEHOLDER] Recognizing abstract navigation patterns",
      briefingText: "[PLACEHOLDER] Abstract pattern analysis",
      successText: "[PLACEHOLDER] Deep space navigation optimized"
    }
  ]
};

// PRE-LAUNCH Category - System checks and preparation sequences
const prelaunchCategory: TaskCategory = {
  category: "pre-launch", 
  description: "Pre-flight system checks and launch sequence preparation",
  icon: "🚀",
  tasks: [
    {
      id: "prelaunch_sequence_prediction",
      name: "Launch Sequence Checklist",
      transformationType: "Sequence prediction",
      flavorText: "T-minus 30 minutes to launch! The automated checklist system needs the next sequence steps predicted to ensure no critical systems are missed.",
      briefingText: "Previous successful launches show standard checklist sequences. Current launch follows similar protocol. Predict the next steps in the sequence.",
      successText: "Launch sequence confirmed! All systems green for liftoff in T-minus 10 minutes."
    },
    {
      id: "prelaunch_conditional_logic",
      name: "Weather Hold Decision Matrix",
      transformationType: "Conditional logic", 
      flavorText: "Weather conditions are marginal for launch. We need to apply the decision matrix logic to determine if we proceed or hold for better conditions.",
      briefingText: "Previous launch decisions show weather condition logic patterns. Current conditions match similar marginal cases. Apply the conditional logic for go/no-go decision.",
      successText: "Weather evaluation complete! Launch conditions are GO - all systems ready for departure."
    },
    {
      id: "prelaunch_object_filtering",
      name: "Critical Systems Isolation",
      transformationType: "Object filtering",
      flavorText: "Pre-launch diagnostics detected anomalies in multiple systems. We need to filter out the critical systems that require immediate attention.",
      briefingText: "Previous diagnostics show which system types are critical for launch safety. Current scan shows mixed results. Filter to identify critical systems only.",
      successText: "Critical systems identified and cleared! All essential systems verified for launch."
    },
    {
      id: "prelaunch_not_operation",
      name: "System Fault Inversion",
      transformationType: "NOT operations",
      flavorText: "The fault detection system is reporting inverted status codes. We need to apply logical NOT operations to get the true system status.",
      briefingText: "Previous fault reports show normal versus inverted status patterns. Current system shows inverted logic. Apply NOT operations to reveal true status.",
      successText: "System status corrected! All faults cleared - launch systems are nominal."
    },
    // Placeholders for remaining 6 pre-launch tasks
    {
      id: "prelaunch_reflection_vertical",
      name: "Launch Tower Clearance",
      transformationType: "Reflection (vertical)",
      flavorText: "[PLACEHOLDER] Launch tower systems need vertical reflection check",
      briefingText: "[PLACEHOLDER] Vertical clearance patterns",
      successText: "[PLACEHOLDER] Launch tower cleared for departure"
    },
    {
      id: "prelaunch_scaling_systems",
      name: "System Load Scaling",
      transformationType: "Scaling (resize objects)",
      flavorText: "[PLACEHOLDER] Launch systems need load scaling verification",
      briefingText: "[PLACEHOLDER] System scaling patterns", 
      successText: "[PLACEHOLDER] All systems scaled for launch load"
    },
    {
      id: "prelaunch_grid_subtraction",
      name: "Pre-flight System Isolation",
      transformationType: "Grid subtraction",
      flavorText: "[PLACEHOLDER] Isolating non-essential systems before launch",
      briefingText: "[PLACEHOLDER] System isolation patterns",
      successText: "[PLACEHOLDER] Non-essential systems safely isolated"
    },
    {
      id: "prelaunch_multiple_rules",
      name: "Launch Protocol Integration",
      transformationType: "Multiple rule application",
      flavorText: "[PLACEHOLDER] Integrating all launch protocols",
      briefingText: "[PLACEHOLDER] Multi-rule integration patterns",
      successText: "[PLACEHOLDER] All launch protocols synchronized"
    },
    {
      id: "prelaunch_adjacent_touching",
      name: "System Interface Verification", 
      transformationType: "Adjacent/touching relationships",
      flavorText: "[PLACEHOLDER] Verifying system interface connections",
      briefingText: "[PLACEHOLDER] Interface connection patterns",
      successText: "[PLACEHOLDER] All system interfaces verified"
    },
    {
      id: "prelaunch_symbol_interpretation",
      name: "Launch Code Verification",
      transformationType: "Symbol interpretation",
      flavorText: "[PLACEHOLDER] Interpreting launch authorization symbols",
      briefingText: "[PLACEHOLDER] Symbol interpretation patterns",
      successText: "[PLACEHOLDER] Launch authorization confirmed"
    }
  ]
};

// COMMUNICATIONS Category - Signal processing and data transmission
const communicationsCategory: TaskCategory = {
  category: "communications",
  description: "Communications array management and signal processing",
  icon: "📡",
  tasks: [
    {
      id: "comms_color_pattern_matching",
      name: "Signal Frequency Decoding",
      transformationType: "Color pattern matching",
      flavorText: "Deep space signals are using color-coded frequency patterns. We need to decode the incoming transmission using our pattern matching protocols.",
      briefingText: "Previous alien contact signals show frequency color patterns. New transmission shows similar color coding. Match the pattern to decode the message.",
      successText: "Signal decoded successfully! Message reads: 'Welcome to the galactic community, Earth.'"
    },
    {
      id: "comms_pattern_extension",
      name: "Communication Array Expansion", 
      transformationType: "Pattern extension",
      flavorText: "Our communication range is insufficient for the Mars mission. The antenna array pattern needs to be extended to reach Earth from Mars orbit.",
      briefingText: "Current array configuration shows basic communication patterns. Mars distance requires extended array pattern. Determine the proper extension sequence.",
      successText: "Communication array extended! Full Earth contact maintained throughout Mars mission."
    },
    {
      id: "comms_shape_transformation",
      name: "Antenna Configuration Optimization",
      transformationType: "Shape transformation", 
      flavorText: "Solar interference is degrading our communications. We need to transform our antenna configuration to maintain signal clarity.",
      briefingText: "Previous solar storm responses show antenna shape transformations that maintained signal quality. Current interference pattern is similar. Apply the transformation.",
      successText: "Antenna reconfigured! Signal quality restored to full strength despite solar activity."
    },
    {
      id: "comms_rule_interaction",
      name: "Multi-Channel Protocol Coordination",
      transformationType: "Rule interaction",
      flavorText: "Multiple space agencies are trying to communicate simultaneously. We need to coordinate the overlapping communication protocols to prevent interference.",
      briefingText: "Previous multi-agency communications show protocol interaction rules. Current situation has similar overlapping channels. Apply the coordination rules.",
      successText: "Communication protocols coordinated! All agencies can now communicate without interference."
    },
    // Placeholders for remaining 6 communications tasks
    {
      id: "comms_rotation_90_signal",
      name: "Signal Array Rotation",
      transformationType: "Rotation (90°)",
      flavorText: "[PLACEHOLDER] Communication array needs 90-degree rotation",
      briefingText: "[PLACEHOLDER] Array rotation patterns",
      successText: "[PLACEHOLDER] Signal array optimally positioned"
    },
    {
      id: "comms_grid_splitting_channels",
      name: "Channel Frequency Division", 
      transformationType: "Grid splitting (horizontal)",
      flavorText: "[PLACEHOLDER] Communication channels need frequency splitting",
      briefingText: "[PLACEHOLDER] Channel division patterns",
      successText: "[PLACEHOLDER] Communication channels optimized"
    },
    {
      id: "comms_object_counting_signals",
      name: "Signal Source Identification",
      transformationType: "Object counting",
      flavorText: "[PLACEHOLDER] Counting active communication sources",
      briefingText: "[PLACEHOLDER] Signal counting patterns",
      successText: "[PLACEHOLDER] All communication sources identified"
    },
    {
      id: "comms_and_operation_protocols",
      name: "Protocol Synchronization",
      transformationType: "AND operations",
      flavorText: "[PLACEHOLDER] Synchronizing multiple communication protocols",
      briefingText: "[PLACEHOLDER] Protocol AND logic patterns",
      successText: "[PLACEHOLDER] All protocols synchronized"
    },
    {
      id: "comms_shape_decomposition",
      name: "Signal Pattern Analysis",
      transformationType: "Shape decomposition", 
      flavorText: "[PLACEHOLDER] Decomposing complex signal patterns",
      briefingText: "[PLACEHOLDER] Pattern decomposition analysis",
      successText: "[PLACEHOLDER] Signal patterns successfully analyzed"
    },
    {
      id: "comms_semantic_relationships",
      name: "Interspecies Communication Logic",
      transformationType: "Semantic relationships",
      flavorText: "[PLACEHOLDER] Establishing semantic communication protocols",
      briefingText: "[PLACEHOLDER] Semantic relationship patterns",
      successText: "[PLACEHOLDER] Interspecies communication established"
    }
  ]
};

// POWER Category - Electrical systems and energy management 
const powerCategory: TaskCategory = {
  category: "power",
  description: "Power systems management and energy distribution optimization", 
  icon: "⚡",
  tasks: [
    {
      id: "power_color_logic_operations",
      name: "Power Grid Load Balancing",
      transformationType: "Color logic operations",
      flavorText: "The spacecraft's power grid is experiencing uneven loads. Different colored indicators show power levels - we need to balance them using logical operations.",
      briefingText: "Previous power balancing operations show color-coded load patterns and logical operations. Current grid shows similar imbalance. Apply the logic to balance loads.",
      successText: "Power grid balanced! All systems receiving optimal power distribution."
    },
    {
      id: "power_single_rule_application", 
      name: "Solar Panel Efficiency Protocol",
      transformationType: "Single rule application",
      flavorText: "Solar panels are operating below optimal efficiency. There's a single rule that governs panel positioning for maximum power generation that needs to be applied.",
      briefingText: "Previous solar panel configurations show the efficiency rule pattern. Current panel arrangement is suboptimal. Apply the single rule for maximum power.",
      successText: "Solar panels optimized! Power generation increased by 35% with proper positioning."
    },
    {
      id: "power_shape_combination_circuits",
      name: "Circuit Board Integration",
      transformationType: "Shape combination", 
      flavorText: "Emergency repairs require combining backup circuit patterns to restore full power to life support systems. The shapes must fit together perfectly.",
      briefingText: "Backup circuit diagrams show individual component shapes. Emergency power restoration requires combining these shapes properly. Determine the combination.",
      successText: "Emergency circuits integrated! Life support systems restored to full power."
    },
    {
      id: "power_conceptual_mapping",
      name: "Energy Distribution Mapping",
      transformationType: "Conceptual mapping",
      flavorText: "The power distribution system uses conceptual mapping to route energy efficiently throughout the spacecraft. We need to map power flow to critical systems.",
      briefingText: "Previous power distribution maps show conceptual routing patterns to critical systems. Current power crisis requires similar mapping. Apply the conceptual framework.",
      successText: "Power distribution mapped! Critical systems prioritized and fully powered."
    },
    // Placeholders for remaining 6 power tasks
    {
      id: "power_rotation_180_generators",
      name: "Generator Alignment",
      transformationType: "Rotation (180°)",
      flavorText: "[PLACEHOLDER] Power generators need 180-degree realignment",
      briefingText: "[PLACEHOLDER] Generator rotation patterns",
      successText: "[PLACEHOLDER] Generators optimally aligned"
    },
    {
      id: "power_reflection_horizontal_panels", 
      name: "Solar Panel Mirror Configuration",
      transformationType: "Reflection (horizontal)",
      flavorText: "[PLACEHOLDER] Solar panel reflectors need horizontal alignment",
      briefingText: "[PLACEHOLDER] Panel reflection patterns",
      successText: "[PLACEHOLDER] Solar reflectors optimized"
    },
    {
      id: "power_translation_battery",
      name: "Battery Module Positioning",
      transformationType: "Translation (moving objects)",
      flavorText: "[PLACEHOLDER] Battery modules need optimal positioning",
      briefingText: "[PLACEHOLDER] Battery positioning patterns",
      successText: "[PLACEHOLDER] Battery modules optimally positioned"
    },
    {
      id: "power_grid_overlay_systems",
      name: "Power System Integration",
      transformationType: "Grid overlay",
      flavorText: "[PLACEHOLDER] Integrating primary and backup power systems",
      briefingText: "[PLACEHOLDER] Power system overlay patterns",
      successText: "[PLACEHOLDER] Power systems fully integrated"
    },
    {
      id: "power_object_grouping_cells",
      name: "Power Cell Organization", 
      transformationType: "Object grouping",
      flavorText: "[PLACEHOLDER] Organizing power cells for maximum efficiency",
      briefingText: "[PLACEHOLDER] Power cell grouping patterns",
      successText: "[PLACEHOLDER] Power cells optimally organized"
    },
    {
      id: "power_or_operation_sources",
      name: "Power Source Selection",
      transformationType: "OR operations",
      flavorText: "[PLACEHOLDER] Selecting optimal power sources",
      briefingText: "[PLACEHOLDER] Power source OR logic patterns", 
      successText: "[PLACEHOLDER] Power sources optimally selected"
    }
  ]
};

// SECURITY Category - Access control and threat detection
const securityCategory: TaskCategory = {
  category: "security",
  description: "Security protocols and threat detection systems",
  icon: "🔒",
  tasks: [
    {
      id: "security_pattern_completion_access",
      name: "Security Access Pattern",
      transformationType: "Pattern completion",
      flavorText: "The security access codes have been partially corrupted by cosmic radiation. We need to complete the authentication pattern to maintain secure systems.",
      briefingText: "Previous successful access attempts show complete security patterns. Current corrupted code shows partial pattern. Complete the security sequence.",
      successText: "Security access restored! All classified systems are properly protected."
    },
    {
      id: "security_object_filtering_threats",
      name: "Threat Classification System", 
      transformationType: "Object filtering",
      flavorText: "Multiple objects are approaching our spacecraft. The security system needs to filter out potential threats from harmless space debris.",
      briefingText: "Previous threat assessments show filtering patterns for dangerous versus harmless objects. Current scan shows mixed objects. Filter threats from debris.",
      successText: "Threat assessment complete! Two debris pieces and one deactivated probe identified - no active threats."
    },
    {
      id: "security_xor_operation_encryption",
      name: "Encryption Key Management",
      transformationType: "XOR operations",
      flavorText: "Secure communications require XOR encryption patterns to prevent interception by hostile forces. The encryption keys need proper logical combination.",
      briefingText: "Previous secure transmissions show XOR encryption patterns for message protection. Current message requires similar encryption. Apply XOR logic to secure data.",
      successText: "Communications encrypted! Message transmitted securely to Earth command."
    },
    {
      id: "security_shape_detection_anomalies",
      name: "Hull Breach Detection",
      transformationType: "Shape detection",
      flavorText: "Micro-meteorite impacts may have compromised hull integrity. Security sensors need to detect any unusual shapes that indicate potential breaches.",
      briefingText: "Previous hull scans show normal structural shapes versus breach indicators. Current security scan shows potential anomalies. Detect any breach shapes.",
      successText: "Hull integrity confirmed! No breaches detected - all security seals intact."
    },
    // Placeholders for remaining 6 security tasks
    {
      id: "security_rotation_270_cameras",
      name: "Security Camera Positioning",
      transformationType: "Rotation (270°)",
      flavorText: "[PLACEHOLDER] Security cameras need 270-degree repositioning",
      briefingText: "[PLACEHOLDER] Camera rotation patterns",
      successText: "[PLACEHOLDER] Security coverage optimized"
    },
    {
      id: "security_reflection_diagonal_shields",
      name: "Defensive Shield Configuration",
      transformationType: "Reflection (diagonal)",
      flavorText: "[PLACEHOLDER] Defensive shields need diagonal reflection setup",
      briefingText: "[PLACEHOLDER] Shield reflection patterns",
      successText: "[PLACEHOLDER] Defensive shields optimally configured"
    },
    {
      id: "security_scaling_perimeter",
      name: "Security Perimeter Scaling",
      transformationType: "Scaling (resize objects)",
      flavorText: "[PLACEHOLDER] Security perimeter needs scaling adjustment",
      briefingText: "[PLACEHOLDER] Perimeter scaling patterns",
      successText: "[PLACEHOLDER] Security perimeter optimized"
    },
    {
      id: "security_grid_merging_zones",
      name: "Security Zone Integration", 
      transformationType: "Grid merging",
      flavorText: "[PLACEHOLDER] Merging multiple security zones",
      briefingText: "[PLACEHOLDER] Security zone merging patterns",
      successText: "[PLACEHOLDER] Security zones fully integrated"
    },
    {
      id: "security_not_operation_access",
      name: "Access Control Inversion",
      transformationType: "NOT operations",
      flavorText: "[PLACEHOLDER] Inverting access control logic",
      briefingText: "[PLACEHOLDER] Access control NOT patterns",
      successText: "[PLACEHOLDER] Access controls properly configured"
    },
    {
      id: "security_rule_interaction_protocols",
      name: "Security Protocol Coordination",
      transformationType: "Rule interaction", 
      flavorText: "[PLACEHOLDER] Coordinating multiple security protocols",
      briefingText: "[PLACEHOLDER] Security rule interaction patterns",
      successText: "[PLACEHOLDER] Security protocols synchronized"
    }
  ]
};

// Complete task category export
export const missionControlCategories: TaskCategory[] = [
  sensorsCategory,
  fuelCategory, 
  navigationCategory,
  prelaunchCategory,
  communicationsCategory,
  powerCategory,
  securityCategory
];

// Utility function to get tasks by transformation type
export function getTasksByTransformation(transformationType: string): TaskDefinition[] {
  const allTasks: TaskDefinition[] = [];
  missionControlCategories.forEach(category => {
    allT