
"use strict";

let SyncModeScenarioLoad = require('./SyncModeScenarioLoad.js');
let WaitForTickResponse = require('./WaitForTickResponse.js');
let SyncModeCmd = require('./SyncModeCmd.js');
let IntscnTL = require('./IntscnTL.js');
let MoraiSrvResponse = require('./MoraiSrvResponse.js');
let EgoVehicleStatusExtended = require('./EgoVehicleStatusExtended.js');
let ERP42Info = require('./ERP42Info.js');
let MapSpecIndex = require('./MapSpecIndex.js');
let SyncModeSetGear = require('./SyncModeSetGear.js');
let SkateboardCtrlCmd = require('./SkateboardCtrlCmd.js');
let VehicleSpec = require('./VehicleSpec.js');
let PREvent = require('./PREvent.js');
let DillyCmdResponse = require('./DillyCmdResponse.js');
let IntersectionStatus = require('./IntersectionStatus.js');
let GPSMessage = require('./GPSMessage.js');
let ObjectStatusList = require('./ObjectStatusList.js');
let MoraiSimProcStatus = require('./MoraiSimProcStatus.js');
let SyncModeAddObject = require('./SyncModeAddObject.js');
let TrafficLight = require('./TrafficLight.js');
let EventInfo = require('./EventInfo.js');
let CollisionData = require('./CollisionData.js');
let SyncModeCtrlCmd = require('./SyncModeCtrlCmd.js');
let SyncModeInfo = require('./SyncModeInfo.js');
let PRStatus = require('./PRStatus.js');
let NpcGhostCmd = require('./NpcGhostCmd.js');
let SaveSensorData = require('./SaveSensorData.js');
let MultiPlayEventResponse = require('./MultiPlayEventResponse.js');
let WoowaDillyStatus = require('./WoowaDillyStatus.js');
let VehicleCollision = require('./VehicleCollision.js');
let CtrlCmd = require('./CtrlCmd.js');
let Lamps = require('./Lamps.js');
let RadarDetection = require('./RadarDetection.js');
let EgoDdVehicleStatus = require('./EgoDdVehicleStatus.js');
let MoraiTLInfo = require('./MoraiTLInfo.js');
let SyncModeCmdResponse = require('./SyncModeCmdResponse.js');
let DdCtrlCmd = require('./DdCtrlCmd.js');
let GhostMessage = require('./GhostMessage.js');
let SkateboardStatus = require('./SkateboardStatus.js');
let SkidSteer6wUGVStatus = require('./SkidSteer6wUGVStatus.js');
let IntersectionControl = require('./IntersectionControl.js');
let SetTrafficLight = require('./SetTrafficLight.js');
let ObjectStatus = require('./ObjectStatus.js');
let DillyCmd = require('./DillyCmd.js');
let ScenarioLoad = require('./ScenarioLoad.js');
let ReplayInfo = require('./ReplayInfo.js');
let RadarDetections = require('./RadarDetections.js');
let VehicleSpecIndex = require('./VehicleSpecIndex.js');
let MapSpec = require('./MapSpec.js');
let MultiPlayEventRequest = require('./MultiPlayEventRequest.js');
let PRCtrlCmd = require('./PRCtrlCmd.js');
let SyncModeResultResponse = require('./SyncModeResultResponse.js');
let MoraiTLIndex = require('./MoraiTLIndex.js');
let SyncModeRemoveObject = require('./SyncModeRemoveObject.js');
let EgoVehicleStatus = require('./EgoVehicleStatus.js');
let NpcGhostInfo = require('./NpcGhostInfo.js');
let GetTrafficLightStatus = require('./GetTrafficLightStatus.js');
let MultiEgoSetting = require('./MultiEgoSetting.js');
let SkidSteer6wUGVCtrlCmd = require('./SkidSteer6wUGVCtrlCmd.js');
let ObjectStatusExtended = require('./ObjectStatusExtended.js');
let MoraiSimProcHandle = require('./MoraiSimProcHandle.js');
let VehicleCollisionData = require('./VehicleCollisionData.js');
let ObjectStatusListExtended = require('./ObjectStatusListExtended.js');
let WaitForTick = require('./WaitForTick.js');
let SensorPosControl = require('./SensorPosControl.js');

module.exports = {
  SyncModeScenarioLoad: SyncModeScenarioLoad,
  WaitForTickResponse: WaitForTickResponse,
  SyncModeCmd: SyncModeCmd,
  IntscnTL: IntscnTL,
  MoraiSrvResponse: MoraiSrvResponse,
  EgoVehicleStatusExtended: EgoVehicleStatusExtended,
  ERP42Info: ERP42Info,
  MapSpecIndex: MapSpecIndex,
  SyncModeSetGear: SyncModeSetGear,
  SkateboardCtrlCmd: SkateboardCtrlCmd,
  VehicleSpec: VehicleSpec,
  PREvent: PREvent,
  DillyCmdResponse: DillyCmdResponse,
  IntersectionStatus: IntersectionStatus,
  GPSMessage: GPSMessage,
  ObjectStatusList: ObjectStatusList,
  MoraiSimProcStatus: MoraiSimProcStatus,
  SyncModeAddObject: SyncModeAddObject,
  TrafficLight: TrafficLight,
  EventInfo: EventInfo,
  CollisionData: CollisionData,
  SyncModeCtrlCmd: SyncModeCtrlCmd,
  SyncModeInfo: SyncModeInfo,
  PRStatus: PRStatus,
  NpcGhostCmd: NpcGhostCmd,
  SaveSensorData: SaveSensorData,
  MultiPlayEventResponse: MultiPlayEventResponse,
  WoowaDillyStatus: WoowaDillyStatus,
  VehicleCollision: VehicleCollision,
  CtrlCmd: CtrlCmd,
  Lamps: Lamps,
  RadarDetection: RadarDetection,
  EgoDdVehicleStatus: EgoDdVehicleStatus,
  MoraiTLInfo: MoraiTLInfo,
  SyncModeCmdResponse: SyncModeCmdResponse,
  DdCtrlCmd: DdCtrlCmd,
  GhostMessage: GhostMessage,
  SkateboardStatus: SkateboardStatus,
  SkidSteer6wUGVStatus: SkidSteer6wUGVStatus,
  IntersectionControl: IntersectionControl,
  SetTrafficLight: SetTrafficLight,
  ObjectStatus: ObjectStatus,
  DillyCmd: DillyCmd,
  ScenarioLoad: ScenarioLoad,
  ReplayInfo: ReplayInfo,
  RadarDetections: RadarDetections,
  VehicleSpecIndex: VehicleSpecIndex,
  MapSpec: MapSpec,
  MultiPlayEventRequest: MultiPlayEventRequest,
  PRCtrlCmd: PRCtrlCmd,
  SyncModeResultResponse: SyncModeResultResponse,
  MoraiTLIndex: MoraiTLIndex,
  SyncModeRemoveObject: SyncModeRemoveObject,
  EgoVehicleStatus: EgoVehicleStatus,
  NpcGhostInfo: NpcGhostInfo,
  GetTrafficLightStatus: GetTrafficLightStatus,
  MultiEgoSetting: MultiEgoSetting,
  SkidSteer6wUGVCtrlCmd: SkidSteer6wUGVCtrlCmd,
  ObjectStatusExtended: ObjectStatusExtended,
  MoraiSimProcHandle: MoraiSimProcHandle,
  VehicleCollisionData: VehicleCollisionData,
  ObjectStatusListExtended: ObjectStatusListExtended,
  WaitForTick: WaitForTick,
  SensorPosControl: SensorPosControl,
};
