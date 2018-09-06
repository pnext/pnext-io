enum PointClass {
  NEVER_CLASSIFIED = 0,
  UNCLASSIFIED = 1,
  GROUND = 2,
  LOW_VEGETATION = 3,
  MEDIUM_VEGETATION = 4,
  HIGH_VEGETATION = 5,
  BUILDING = 6,
  LOW_POINT = 7, // noise
  MODEL_KEY_POINT = 8, // mass point
  WATER = 9,
  RAIL = 10,
  ROAD_SURFACE = 11,
  OVERLAP_POINTS = 12,
  WIRE_GUARD = 13, // shield
  WIRE_CONDUCTOR = 14, // phase
  TRANSMISSION_TOWER = 15,
  WIRE_STRUCTURE_CONNECTOR = 16,
  BRIDGE_DECK = 17,
  HIGH_NOISE = 18,
  USER_CLASS = 19 // Defined by the user.
}

export default PointClass
