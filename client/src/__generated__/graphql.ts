import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Branch = {
  __typename?: 'Branch';
  BranchId?: Maybe<Scalars['String']['output']>;
  BranchName?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
};

export type BranchInsertInput = {
  BranchId?: InputMaybe<Scalars['String']['input']>;
  BranchName?: InputMaybe<Scalars['String']['input']>;
};

export type BranchUpdateInput = {
  BranchId?: InputMaybe<Scalars['String']['input']>;
  BranchName?: InputMaybe<Scalars['String']['input']>;
  _id: Scalars['ID']['input'];
};

export type Channel = {
  __typename?: 'Channel';
  BaseLine?: Maybe<Scalars['Float']['output']>;
  BaseMax?: Maybe<Scalars['Float']['output']>;
  BaseMin?: Maybe<Scalars['Float']['output']>;
  ChannelId?: Maybe<Scalars['String']['output']>;
  ChannelName?: Maybe<Scalars['String']['output']>;
  ForwardFlow?: Maybe<Scalars['Boolean']['output']>;
  IndexTimeStamp?: Maybe<Scalars['Date']['output']>;
  LastIndex?: Maybe<Scalars['Float']['output']>;
  LastValue?: Maybe<Scalars['Float']['output']>;
  LoggerId?: Maybe<Scalars['String']['output']>;
  OtherChannel?: Maybe<Scalars['Boolean']['output']>;
  Pressure1?: Maybe<Scalars['Boolean']['output']>;
  Pressure2?: Maybe<Scalars['Boolean']['output']>;
  ReverseFlow?: Maybe<Scalars['Boolean']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Unit?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
};

export type ChannelInsertInput = {
  BaseLine?: InputMaybe<Scalars['Float']['input']>;
  BaseMax?: InputMaybe<Scalars['Float']['input']>;
  BaseMin?: InputMaybe<Scalars['Float']['input']>;
  ChannelId?: InputMaybe<Scalars['String']['input']>;
  ChannelName?: InputMaybe<Scalars['String']['input']>;
  ForwardFlow?: InputMaybe<Scalars['Boolean']['input']>;
  IndexTimeStamp?: InputMaybe<Scalars['Date']['input']>;
  LastIndex?: InputMaybe<Scalars['Float']['input']>;
  LastValue?: InputMaybe<Scalars['Float']['input']>;
  LoggerId?: InputMaybe<Scalars['String']['input']>;
  OtherChannel?: InputMaybe<Scalars['Boolean']['input']>;
  Pressure1?: InputMaybe<Scalars['Boolean']['input']>;
  Pressure2?: InputMaybe<Scalars['Boolean']['input']>;
  ReverseFlow?: InputMaybe<Scalars['Boolean']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Unit?: InputMaybe<Scalars['String']['input']>;
};

export type ChannelUpdateInput = {
  BaseLine?: InputMaybe<Scalars['Float']['input']>;
  BaseMax?: InputMaybe<Scalars['Float']['input']>;
  BaseMin?: InputMaybe<Scalars['Float']['input']>;
  ChannelId?: InputMaybe<Scalars['String']['input']>;
  ChannelName?: InputMaybe<Scalars['String']['input']>;
  ForwardFlow?: InputMaybe<Scalars['Boolean']['input']>;
  IndexTimeStamp?: InputMaybe<Scalars['Date']['input']>;
  LastIndex?: InputMaybe<Scalars['Float']['input']>;
  LastValue?: InputMaybe<Scalars['Float']['input']>;
  LoggerId?: InputMaybe<Scalars['String']['input']>;
  OtherChannel?: InputMaybe<Scalars['Boolean']['input']>;
  Pressure1?: InputMaybe<Scalars['Boolean']['input']>;
  Pressure2?: InputMaybe<Scalars['Boolean']['input']>;
  ReverseFlow?: InputMaybe<Scalars['Boolean']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Unit?: InputMaybe<Scalars['String']['input']>;
  _id: Scalars['ID']['input'];
};

export type ChannelValueUpdateInput = {
  ChannelId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Value?: InputMaybe<Scalars['Float']['input']>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  a?: Maybe<Scalars['String']['output']>;
};

export type DailyData = {
  __typename?: 'DailyData';
  ForwardFlow?: Maybe<Scalars['Float']['output']>;
  LoggerId?: Maybe<Scalars['String']['output']>;
  Pressure1?: Maybe<Scalars['Float']['output']>;
  Pressure2?: Maybe<Scalars['Float']['output']>;
  ReverseFlow?: Maybe<Scalars['Float']['output']>;
  SiteId?: Maybe<Scalars['String']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  _id: Scalars['ID']['output'];
};

export type DataChart = {
  __typename?: 'DataChart';
  BaseMax?: Maybe<Scalars['Float']['output']>;
  BaseMin?: Maybe<Scalars['Float']['output']>;
  ChannelId?: Maybe<Scalars['String']['output']>;
  ChannelName?: Maybe<Scalars['String']['output']>;
  ListDataLogger?: Maybe<Array<Maybe<DataLogger>>>;
  Unit?: Maybe<Scalars['String']['output']>;
};

export type DataDrawPipe = {
  __typename?: 'DataDrawPipe';
  GroupPipeId?: Maybe<Scalars['String']['output']>;
  GroupPipeName?: Maybe<Scalars['String']['output']>;
  Pipes?: Maybe<Array<Maybe<DrawPipe>>>;
};

export type DataLogger = {
  __typename?: 'DataLogger';
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
  _id?: Maybe<Scalars['ID']['output']>;
};

export type DataLoggerInsertInput = {
  ChannelId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Value?: InputMaybe<Scalars['Float']['input']>;
};

export type DataLoggerUpdateInput = {
  ChannelId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Value?: InputMaybe<Scalars['Float']['input']>;
  _id: Scalars['ID']['input'];
};

export type DataManual = {
  __typename?: 'DataManual';
  SiteId?: Maybe<Scalars['String']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
  _id: Scalars['ID']['output'];
};

export type DataManualInsertInput = {
  SiteId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Value?: InputMaybe<Scalars['Float']['input']>;
};

export type DataManualUpdateInput = {
  SiteId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Value?: InputMaybe<Scalars['Float']['input']>;
  _id: Scalars['ID']['input'];
};

export type DataQuantityDailyNm = {
  __typename?: 'DataQuantityDailyNM';
  GD1?: Maybe<Scalars['Float']['output']>;
  GD2?: Maybe<Scalars['Float']['output']>;
  GD3?: Maybe<Scalars['Float']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Total?: Maybe<Scalars['Float']['output']>;
};

export type DataQuantityDailyNt = {
  __typename?: 'DataQuantityDailyNT';
  GD1?: Maybe<Scalars['Float']['output']>;
  GD2?: Maybe<Scalars['Float']['output']>;
  GD3?: Maybe<Scalars['Float']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Total?: Maybe<Scalars['Float']['output']>;
};

export type DataQuantityMonthlyNm = {
  __typename?: 'DataQuantityMonthlyNM';
  AvgValue?: Maybe<Scalars['Float']['output']>;
  CountDay?: Maybe<Scalars['Int']['output']>;
  EndDate?: Maybe<Scalars['Date']['output']>;
  IsEnoughData?: Maybe<Scalars['Boolean']['output']>;
  StartDate?: Maybe<Scalars['Date']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
};

export type DataQuantityMonthlyNt = {
  __typename?: 'DataQuantityMonthlyNT';
  AvgValue?: Maybe<Scalars['Float']['output']>;
  CountDay?: Maybe<Scalars['Int']['output']>;
  EndDate?: Maybe<Scalars['Date']['output']>;
  IsEnoughData?: Maybe<Scalars['Boolean']['output']>;
  StartDate?: Maybe<Scalars['Date']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
};

export type DataQuantityMonthlyTb = {
  __typename?: 'DataQuantityMonthlyTB';
  AvgValue?: Maybe<Scalars['Float']['output']>;
  CountDay?: Maybe<Scalars['Int']['output']>;
  EndDate?: Maybe<Scalars['Date']['output']>;
  IsEnoughData?: Maybe<Scalars['Boolean']['output']>;
  StartDate?: Maybe<Scalars['Date']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
};

export type DataQuantityTb = {
  __typename?: 'DataQuantityTB';
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
};

export type DataQuantityYearlyNm = {
  __typename?: 'DataQuantityYearlyNM';
  AvgValue?: Maybe<Scalars['Float']['output']>;
  CountDay?: Maybe<Scalars['Int']['output']>;
  EndDate?: Maybe<Scalars['Date']['output']>;
  IsEnoughData?: Maybe<Scalars['Boolean']['output']>;
  StartDate?: Maybe<Scalars['Date']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
};

export type DataQuantityYearlyNt = {
  __typename?: 'DataQuantityYearlyNT';
  AvgValue?: Maybe<Scalars['Float']['output']>;
  CountDay?: Maybe<Scalars['Int']['output']>;
  EndDate?: Maybe<Scalars['Date']['output']>;
  IsEnoughData?: Maybe<Scalars['Boolean']['output']>;
  StartDate?: Maybe<Scalars['Date']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
};

export type DataQuantityYearlyTb = {
  __typename?: 'DataQuantityYearlyTB';
  AvgValue?: Maybe<Scalars['Float']['output']>;
  CountDay?: Maybe<Scalars['Int']['output']>;
  EndDate?: Maybe<Scalars['Date']['output']>;
  IsEnoughData?: Maybe<Scalars['Boolean']['output']>;
  StartDate?: Maybe<Scalars['Date']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
};

export type DataTable = {
  __typename?: 'DataTable';
  ForwardFlow?: Maybe<Scalars['Float']['output']>;
  IndexForwardFlow?: Maybe<Scalars['Float']['output']>;
  IndexReverseFlow?: Maybe<Scalars['Float']['output']>;
  Location?: Maybe<Scalars['String']['output']>;
  Pressure?: Maybe<Scalars['Float']['output']>;
  ReverseFlow?: Maybe<Scalars['Float']['output']>;
  STT?: Maybe<Scalars['Int']['output']>;
  SiteId?: Maybe<Scalars['String']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Type?: Maybe<Scalars['Int']['output']>;
};

export type DisplayGroup = {
  __typename?: 'DisplayGroup';
  Group?: Maybe<Scalars['String']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
};

export type DisplayGroupInsertInput = {
  Group?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
};

export type DisplayGroupUpdateInput = {
  Group?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  _id: Scalars['ID']['input'];
};

export type DrawLine = {
  __typename?: 'DrawLine';
  Color?: Maybe<Scalars['String']['output']>;
  Lines?: Maybe<Array<Maybe<Array<Maybe<Scalars['Float']['output']>>>>>;
};

export type DrawPipe = {
  __typename?: 'DrawPipe';
  BaseMax?: Maybe<Scalars['Float']['output']>;
  BaseMin?: Maybe<Scalars['Float']['output']>;
  Length?: Maybe<Scalars['Int']['output']>;
  Lines?: Maybe<Array<Maybe<DrawLine>>>;
  PipeId?: Maybe<Scalars['String']['output']>;
  PipeName?: Maybe<Scalars['String']['output']>;
  Size?: Maybe<Scalars['Int']['output']>;
  TypeAlarmChannel?: Maybe<Scalars['String']['output']>;
};

export type GroupPipe = {
  __typename?: 'GroupPipe';
  Color?: Maybe<Scalars['String']['output']>;
  Description?: Maybe<Scalars['String']['output']>;
  GroupPipeId?: Maybe<Scalars['String']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
  SiteIdEnd?: Maybe<Scalars['String']['output']>;
  SiteIdStart?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
};

export type GroupPipeInsertInput = {
  Color?: InputMaybe<Scalars['String']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  GroupPipeId?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  SiteIdEnd?: InputMaybe<Scalars['String']['input']>;
  SiteIdStart?: InputMaybe<Scalars['String']['input']>;
};

export type GroupPipeUpdateInput = {
  Color?: InputMaybe<Scalars['String']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  GroupPipeId?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  SiteIdEnd?: InputMaybe<Scalars['String']['input']>;
  SiteIdStart?: InputMaybe<Scalars['String']['input']>;
  _id: Scalars['ID']['input'];
};

export type ListPointBranch = {
  __typename?: 'ListPointBranch';
  BranchId?: Maybe<Scalars['String']['output']>;
  Level?: Maybe<Scalars['Int']['output']>;
  PointId?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
};

export type ListPointBranchInput = {
  BranchId?: InputMaybe<Scalars['String']['input']>;
  Level?: InputMaybe<Scalars['Int']['input']>;
  PointId?: InputMaybe<Scalars['String']['input']>;
};

export type ListPointBranchUpdateInput = {
  BranchId?: InputMaybe<Scalars['String']['input']>;
  Data?: InputMaybe<Array<InputMaybe<ListPointBranchInput>>>;
};

export type ListPointPipe = {
  __typename?: 'ListPointPipe';
  PipeId?: Maybe<Scalars['String']['output']>;
  PointId?: Maybe<Scalars['String']['output']>;
  STT?: Maybe<Scalars['Int']['output']>;
  _id: Scalars['ID']['output'];
};

export type ListPointPipeInput = {
  PipeId?: InputMaybe<Scalars['String']['input']>;
  PointId?: InputMaybe<Scalars['String']['input']>;
  STT?: InputMaybe<Scalars['Int']['input']>;
};

export type ListPointPipeUpdateInput = {
  Data?: InputMaybe<Array<InputMaybe<ListPointPipeInput>>>;
  PipeId?: InputMaybe<Scalars['String']['input']>;
};

export type Login = {
  __typename?: 'Login';
  Role?: Maybe<Scalars['String']['output']>;
  Username?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type LostBranch = {
  __typename?: 'LostBranch';
  Quantitylevel1?: Maybe<Scalars['Float']['output']>;
  Quantitylevel2?: Maybe<Scalars['Float']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
};

export type ManualIndex = {
  __typename?: 'ManualIndex';
  SiteId?: Maybe<Scalars['String']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Value?: Maybe<Scalars['Float']['output']>;
  _id: Scalars['ID']['output'];
};

export type ManualIndexInsertInput = {
  SiteId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Value?: InputMaybe<Scalars['Float']['input']>;
};

export type ManualIndexUpdateInput = {
  SiteId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Value?: InputMaybe<Scalars['Float']['input']>;
  _id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DeleteBranch?: Maybe<Scalars['Int']['output']>;
  DeleteChannel?: Maybe<Scalars['Int']['output']>;
  DeleteDataLogger?: Maybe<Scalars['Int']['output']>;
  DeleteDataManual?: Maybe<Scalars['Int']['output']>;
  DeleteDisplayGroup?: Maybe<Scalars['Int']['output']>;
  DeleteGroupPipe?: Maybe<Scalars['Int']['output']>;
  DeleteManualIndex?: Maybe<Scalars['Int']['output']>;
  DeletePipe?: Maybe<Scalars['Int']['output']>;
  DeleteSite?: Maybe<Scalars['Int']['output']>;
  DeleteUser?: Maybe<Scalars['Int']['output']>;
  InsertBranch?: Maybe<Scalars['String']['output']>;
  InsertChannel?: Maybe<Scalars['String']['output']>;
  InsertDataLogger?: Maybe<Scalars['String']['output']>;
  InsertDataManual?: Maybe<Scalars['String']['output']>;
  InsertDisplayGroup?: Maybe<Scalars['String']['output']>;
  InsertGroupPipe?: Maybe<Scalars['String']['output']>;
  InsertManualIndex?: Maybe<Scalars['String']['output']>;
  InsertPipe?: Maybe<Scalars['String']['output']>;
  InsertSite?: Maybe<Scalars['String']['output']>;
  InsertUser?: Maybe<Scalars['String']['output']>;
  UpdateBranch?: Maybe<Scalars['Int']['output']>;
  UpdateChannel?: Maybe<Scalars['Int']['output']>;
  UpdateDataLogger?: Maybe<Scalars['Int']['output']>;
  UpdateDataManual?: Maybe<Scalars['Int']['output']>;
  UpdateDisplayGroup?: Maybe<Scalars['Int']['output']>;
  UpdateGroupPipe?: Maybe<Scalars['Int']['output']>;
  UpdateListPointBranch?: Maybe<Scalars['Int']['output']>;
  UpdateListPointPipe?: Maybe<Scalars['Int']['output']>;
  UpdateManualIndex?: Maybe<Scalars['Int']['output']>;
  UpdatePipe?: Maybe<Scalars['Int']['output']>;
  UpdateSite?: Maybe<Scalars['Int']['output']>;
  UpdateUser?: Maybe<Scalars['Int']['output']>;
  UpdateValueChannel?: Maybe<Scalars['Int']['output']>;
};


export type MutationDeleteBranchArgs = {
  branch?: InputMaybe<BranchUpdateInput>;
};


export type MutationDeleteChannelArgs = {
  channel?: InputMaybe<ChannelUpdateInput>;
};


export type MutationDeleteDataLoggerArgs = {
  data?: InputMaybe<DataLoggerUpdateInput>;
};


export type MutationDeleteDataManualArgs = {
  data?: InputMaybe<DataManualUpdateInput>;
};


export type MutationDeleteDisplayGroupArgs = {
  displayGroup?: InputMaybe<DisplayGroupUpdateInput>;
};


export type MutationDeleteGroupPipeArgs = {
  groupPipe?: InputMaybe<GroupPipeUpdateInput>;
};


export type MutationDeleteManualIndexArgs = {
  data?: InputMaybe<ManualIndexUpdateInput>;
};


export type MutationDeletePipeArgs = {
  pipe?: InputMaybe<PipeUpdateInput>;
};


export type MutationDeleteSiteArgs = {
  site?: InputMaybe<SiteUpdateInput>;
};


export type MutationDeleteUserArgs = {
  user?: InputMaybe<UserUpdateInput>;
};


export type MutationInsertBranchArgs = {
  branch?: InputMaybe<BranchInsertInput>;
};


export type MutationInsertChannelArgs = {
  channel?: InputMaybe<ChannelInsertInput>;
};


export type MutationInsertDataLoggerArgs = {
  data?: InputMaybe<DataLoggerInsertInput>;
};


export type MutationInsertDataManualArgs = {
  data?: InputMaybe<DataManualInsertInput>;
};


export type MutationInsertDisplayGroupArgs = {
  displayGroup?: InputMaybe<DisplayGroupInsertInput>;
};


export type MutationInsertGroupPipeArgs = {
  groupPipe?: InputMaybe<GroupPipeInsertInput>;
};


export type MutationInsertManualIndexArgs = {
  data?: InputMaybe<ManualIndexInsertInput>;
};


export type MutationInsertPipeArgs = {
  pipe?: InputMaybe<PipeInsertInput>;
};


export type MutationInsertSiteArgs = {
  site?: InputMaybe<SiteInsertInput>;
};


export type MutationInsertUserArgs = {
  user?: InputMaybe<UserInsertInput>;
};


export type MutationUpdateBranchArgs = {
  branch?: InputMaybe<BranchUpdateInput>;
};


export type MutationUpdateChannelArgs = {
  channel?: InputMaybe<ChannelUpdateInput>;
};


export type MutationUpdateDataLoggerArgs = {
  data?: InputMaybe<DataLoggerUpdateInput>;
};


export type MutationUpdateDataManualArgs = {
  data?: InputMaybe<DataManualUpdateInput>;
};


export type MutationUpdateDisplayGroupArgs = {
  displayGroup?: InputMaybe<DisplayGroupUpdateInput>;
};


export type MutationUpdateGroupPipeArgs = {
  groupPipe?: InputMaybe<GroupPipeUpdateInput>;
};


export type MutationUpdateListPointBranchArgs = {
  list?: InputMaybe<ListPointBranchUpdateInput>;
};


export type MutationUpdateListPointPipeArgs = {
  list?: InputMaybe<ListPointPipeUpdateInput>;
};


export type MutationUpdateManualIndexArgs = {
  data?: InputMaybe<ManualIndexUpdateInput>;
};


export type MutationUpdatePipeArgs = {
  pipe?: InputMaybe<PipeUpdateInput>;
};


export type MutationUpdateSiteArgs = {
  site?: InputMaybe<SiteUpdateInput>;
};


export type MutationUpdateUserArgs = {
  user?: InputMaybe<UserUpdateInput>;
};


export type MutationUpdateValueChannelArgs = {
  channel?: InputMaybe<ChannelValueUpdateInput>;
};

export type Pipe = {
  __typename?: 'Pipe';
  BaseMax?: Maybe<Scalars['Float']['output']>;
  BaseMin?: Maybe<Scalars['Float']['output']>;
  ColorBaseMax?: Maybe<Scalars['String']['output']>;
  ColorBaseMin?: Maybe<Scalars['String']['output']>;
  Description?: Maybe<Scalars['String']['output']>;
  GroupPipeId?: Maybe<Scalars['String']['output']>;
  Length?: Maybe<Scalars['Int']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
  PipeId?: Maybe<Scalars['String']['output']>;
  SetPrioritize?: Maybe<Scalars['Int']['output']>;
  Size?: Maybe<Scalars['Int']['output']>;
  TypeChannelAlarm?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
};

export type PipeInsertInput = {
  BaseMax?: InputMaybe<Scalars['Float']['input']>;
  BaseMin?: InputMaybe<Scalars['Float']['input']>;
  ColorBaseMax?: InputMaybe<Scalars['String']['input']>;
  ColorBaseMin?: InputMaybe<Scalars['String']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  GroupPipeId?: InputMaybe<Scalars['String']['input']>;
  Length?: InputMaybe<Scalars['Int']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  PipeId?: InputMaybe<Scalars['String']['input']>;
  SetPrioritize?: InputMaybe<Scalars['String']['input']>;
  Size?: InputMaybe<Scalars['Int']['input']>;
  TypeChannelAlarm?: InputMaybe<Scalars['String']['input']>;
};

export type PipeUpdateInput = {
  BaseMax?: InputMaybe<Scalars['Float']['input']>;
  BaseMin?: InputMaybe<Scalars['Float']['input']>;
  ColorBaseMax?: InputMaybe<Scalars['String']['input']>;
  ColorBaseMin?: InputMaybe<Scalars['String']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  GroupPipeId?: InputMaybe<Scalars['String']['input']>;
  Length?: InputMaybe<Scalars['Int']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  PipeId?: InputMaybe<Scalars['String']['input']>;
  SetPrioritize?: InputMaybe<Scalars['String']['input']>;
  Size?: InputMaybe<Scalars['Int']['input']>;
  TypeChannelAlarm?: InputMaybe<Scalars['String']['input']>;
  _id: Scalars['ID']['input'];
};

export type QuantitySite = {
  __typename?: 'QuantitySite';
  AvgFlow?: Maybe<Scalars['Float']['output']>;
  AvgPressure?: Maybe<Scalars['Float']['output']>;
  Index?: Maybe<Scalars['Float']['output']>;
  MaxFlow?: Maybe<Scalars['Float']['output']>;
  MaxPressure?: Maybe<Scalars['Float']['output']>;
  MinFlow?: Maybe<Scalars['Float']['output']>;
  MinPressure?: Maybe<Scalars['Float']['output']>;
  Quantity?: Maybe<Scalars['Float']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
};

export type Query = {
  __typename?: 'Query';
  GetBranchs?: Maybe<Array<Maybe<Branch>>>;
  GetChannelByLoggerId?: Maybe<Array<Maybe<Channel>>>;
  GetChannels?: Maybe<Array<Channel>>;
  GetDailyDataByChannelTimeStamp?: Maybe<DataChart>;
  GetDailyDataBySiteIdTimeStamp?: Maybe<Array<Maybe<DataChart>>>;
  GetDailyDatas?: Maybe<Array<Maybe<DailyData>>>;
  GetDataDrawingPipe?: Maybe<Array<Maybe<DataDrawPipe>>>;
  GetDataIndexManualBySiteId?: Maybe<Array<Maybe<ManualIndex>>>;
  GetDataIndexManuals?: Maybe<Array<Maybe<ManualIndex>>>;
  GetDataLoggerByCurrentTime?: Maybe<DataChart>;
  GetDataLoggerByCurrentTimeForManualData?: Maybe<Array<Maybe<DataLogger>>>;
  GetDataLoggerByTimeStamp?: Maybe<DataChart>;
  GetDataLoggerByTimeStampForManualData?: Maybe<Array<Maybe<DataLogger>>>;
  GetDataLoggerOfSiteByTimeStamp?: Maybe<Array<Maybe<DataChart>>>;
  GetDataLoggerOfSiteCurrentTime?: Maybe<Array<Maybe<DataChart>>>;
  GetDataLoggerPressureByLoggerId?: Maybe<Array<Maybe<DataLogger>>>;
  GetDataManualBySiteId?: Maybe<Array<Maybe<DataManual>>>;
  GetDataManuals?: Maybe<Array<Maybe<DataManual>>>;
  GetDataQuantityAndIndexManual?: Maybe<Array<Maybe<SiteAndManualIndex>>>;
  GetDataTableCurrent?: Maybe<Array<Maybe<DataTable>>>;
  GetDisplayGroups?: Maybe<Array<Maybe<DisplayGroup>>>;
  GetGroupPipes?: Maybe<Array<Maybe<GroupPipe>>>;
  GetIndexLoggerExactTime?: Maybe<Array<Maybe<DataLogger>>>;
  GetIndexLoggerFilterTime?: Maybe<Array<Maybe<DataLogger>>>;
  GetListPointBranchByBranchId?: Maybe<Array<Maybe<ListPointBranch>>>;
  GetListPointPipeByPipeId?: Maybe<Array<Maybe<ListPointPipe>>>;
  GetLostWaterBranch?: Maybe<Array<Maybe<LostBranch>>>;
  GetManualIndexDailyNM?: Maybe<Array<Maybe<DataQuantityDailyNm>>>;
  GetManualIndexDailyNT?: Maybe<Array<Maybe<DataQuantityDailyNt>>>;
  GetManualIndexDailyTB2?: Maybe<Array<Maybe<DataQuantityTb>>>;
  GetManualIndexMonthlyNM?: Maybe<Array<Maybe<DataQuantityMonthlyNm>>>;
  GetManualIndexMonthlyNT?: Maybe<Array<Maybe<DataQuantityMonthlyNt>>>;
  GetManualIndexMonthlyTB2?: Maybe<Array<Maybe<DataQuantityMonthlyTb>>>;
  GetManualIndexYearlyNM?: Maybe<Array<Maybe<DataQuantityYearlyNm>>>;
  GetManualIndexYearlyNT?: Maybe<Array<Maybe<DataQuantityYearlyNt>>>;
  GetManualIndexYearlyTB2?: Maybe<Array<Maybe<DataQuantityYearlyTb>>>;
  GetNodeTypes?: Maybe<Array<TypeNode>>;
  GetPipes?: Maybe<Array<Maybe<Pipe>>>;
  GetQuantityDaily?: Maybe<Array<Maybe<QuantitySite>>>;
  GetQuantityDailyNM?: Maybe<Array<Maybe<DataQuantityDailyNm>>>;
  GetQuantityDailyNT?: Maybe<Array<Maybe<DataQuantityDailyNt>>>;
  GetQuantityDailyTB2?: Maybe<Array<Maybe<DataQuantityTb>>>;
  GetQuantityHourly?: Maybe<Array<Maybe<QuantitySite>>>;
  GetQuantityMonthly?: Maybe<Array<Maybe<QuantitySite>>>;
  GetQuantityMonthlyNM?: Maybe<Array<Maybe<DataQuantityMonthlyNm>>>;
  GetQuantityMonthlyNT?: Maybe<Array<Maybe<DataQuantityMonthlyNt>>>;
  GetQuantityMonthlyTB2?: Maybe<Array<Maybe<DataQuantityMonthlyTb>>>;
  GetQuantityYearly?: Maybe<Array<Maybe<QuantitySite>>>;
  GetQuantityYearlyNM?: Maybe<Array<Maybe<DataQuantityYearlyNm>>>;
  GetQuantityYearlyNT?: Maybe<Array<Maybe<DataQuantityYearlyNt>>>;
  GetQuantityYearlyTB2?: Maybe<Array<Maybe<DataQuantityYearlyTb>>>;
  GetRoles?: Maybe<Array<Maybe<Role>>>;
  GetSiteAndChannel?: Maybe<Array<SiteAndChannel>>;
  GetSiteIsManualMeter?: Maybe<Array<Maybe<Site>>>;
  GetSiteIsMeter?: Maybe<Array<Maybe<Site>>>;
  GetSiteIsMeterTotal?: Maybe<Array<Maybe<Site>>>;
  GetSiteIsMeterTotalBranch?: Maybe<Array<Maybe<Site>>>;
  GetSites?: Maybe<Array<Site>>;
  GetTotalQuantityByTimeStamp?: Maybe<Scalars['Float']['output']>;
  GetUserByUsername?: Maybe<Array<Maybe<User>>>;
  GetUsers?: Maybe<Array<Maybe<User>>>;
  LoginAction?: Maybe<Login>;
  VerifyPassword?: Maybe<Scalars['Boolean']['output']>;
  VerifyToken?: Maybe<Scalars['String']['output']>;
};


export type QueryGetChannelByLoggerIdArgs = {
  loggerid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDailyDataByChannelTimeStampArgs = {
  channelid?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDailyDataBySiteIdTimeStampArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  loggerid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataIndexManualBySiteIdArgs = {
  siteid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataLoggerByCurrentTimeArgs = {
  channelid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataLoggerByCurrentTimeForManualDataArgs = {
  channelid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataLoggerByTimeStampArgs = {
  channelid?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataLoggerByTimeStampForManualDataArgs = {
  channelid?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataLoggerOfSiteByTimeStampArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  loggerid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataLoggerOfSiteCurrentTimeArgs = {
  loggerid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataLoggerPressureByLoggerIdArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  loggerid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataManualBySiteIdArgs = {
  siteid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDataQuantityAndIndexManualArgs = {
  time?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetIndexLoggerExactTimeArgs = {
  channelid?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetIndexLoggerFilterTimeArgs = {
  channelid?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetListPointBranchByBranchIdArgs = {
  branchid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetListPointPipeByPipeIdArgs = {
  pipeid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetLostWaterBranchArgs = {
  branchid?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetManualIndexDailyNmArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetManualIndexDailyNtArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetManualIndexDailyTb2Args = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetManualIndexMonthlyNmArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetManualIndexMonthlyNtArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetManualIndexMonthlyTb2Args = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetManualIndexYearlyNmArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetManualIndexYearlyNtArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetManualIndexYearlyTb2Args = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityDailyArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityDailyNmArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetQuantityDailyNtArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetQuantityDailyTb2Args = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetQuantityHourlyArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityMonthlyArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityMonthlyNmArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityMonthlyNtArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityMonthlyTb2Args = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityYearlyArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityYearlyNmArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityYearlyNtArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetQuantityYearlyTb2Args = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTotalQuantityByTimeStampArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserByUsernameArgs = {
  Username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLoginActionArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVerifyPasswordArgs = {
  Password?: InputMaybe<Scalars['String']['input']>;
  Username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  Description?: Maybe<Scalars['String']['output']>;
  Role?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
};

export type Site = {
  __typename?: 'Site';
  Available?: Maybe<Scalars['String']['output']>;
  DisplayGroup?: Maybe<Scalars['String']['output']>;
  IsDNP?: Maybe<Scalars['Boolean']['output']>;
  IsHWM?: Maybe<Scalars['Boolean']['output']>;
  IsManualMeter?: Maybe<Scalars['Boolean']['output']>;
  IsScadaMeter?: Maybe<Scalars['Boolean']['output']>;
  IsShowLabel?: Maybe<Scalars['Boolean']['output']>;
  Latitude?: Maybe<Scalars['Float']['output']>;
  Location?: Maybe<Scalars['String']['output']>;
  LoggerId?: Maybe<Scalars['String']['output']>;
  Longitude?: Maybe<Scalars['Float']['output']>;
  Note?: Maybe<Scalars['String']['output']>;
  Prioritize?: Maybe<Scalars['Boolean']['output']>;
  SiteId?: Maybe<Scalars['String']['output']>;
  StartHour?: Maybe<Scalars['Int']['output']>;
  Status?: Maybe<Scalars['String']['output']>;
  TimeDelay?: Maybe<Scalars['Int']['output']>;
  Type?: Maybe<Scalars['Int']['output']>;
  _id: Scalars['ID']['output'];
};

export type SiteAndChannel = {
  __typename?: 'SiteAndChannel';
  Available?: Maybe<Scalars['String']['output']>;
  Channels?: Maybe<Array<Maybe<Channel>>>;
  DisplayGroup?: Maybe<Scalars['String']['output']>;
  IsDNP?: Maybe<Scalars['Boolean']['output']>;
  IsHWM?: Maybe<Scalars['Boolean']['output']>;
  IsManualMeter?: Maybe<Scalars['Boolean']['output']>;
  IsScadaMeter?: Maybe<Scalars['Boolean']['output']>;
  IsShowLabel?: Maybe<Scalars['Boolean']['output']>;
  Latitude?: Maybe<Scalars['Float']['output']>;
  LengthPipe?: Maybe<Scalars['Int']['output']>;
  Location?: Maybe<Scalars['String']['output']>;
  LoggerId?: Maybe<Scalars['String']['output']>;
  Longitude?: Maybe<Scalars['Float']['output']>;
  Note?: Maybe<Scalars['String']['output']>;
  PipeId?: Maybe<Scalars['String']['output']>;
  PipeName?: Maybe<Scalars['String']['output']>;
  Prioritize?: Maybe<Scalars['Boolean']['output']>;
  SiteId?: Maybe<Scalars['String']['output']>;
  SizePipe?: Maybe<Scalars['Int']['output']>;
  StartHour?: Maybe<Scalars['Int']['output']>;
  Status?: Maybe<Scalars['String']['output']>;
  StatusError?: Maybe<Scalars['Int']['output']>;
  Type?: Maybe<Scalars['Int']['output']>;
  _id: Scalars['ID']['output'];
};

export type SiteAndManualIndex = {
  __typename?: 'SiteAndManualIndex';
  IdManualIndex?: Maybe<Scalars['ID']['output']>;
  IndexManual?: Maybe<Scalars['Float']['output']>;
  Location?: Maybe<Scalars['String']['output']>;
  Quantity?: Maybe<Scalars['Float']['output']>;
  SiteId?: Maybe<Scalars['String']['output']>;
};

export type SiteInsertInput = {
  Available?: InputMaybe<Scalars['String']['input']>;
  DisplayGroup?: InputMaybe<Scalars['String']['input']>;
  IsDNP?: InputMaybe<Scalars['Boolean']['input']>;
  IsHWM?: InputMaybe<Scalars['Boolean']['input']>;
  IsManualMeter?: InputMaybe<Scalars['Boolean']['input']>;
  IsScadaMeter?: InputMaybe<Scalars['Boolean']['input']>;
  IsShowLabel?: InputMaybe<Scalars['Boolean']['input']>;
  Latitude?: InputMaybe<Scalars['Float']['input']>;
  Location?: InputMaybe<Scalars['String']['input']>;
  LoggerId?: InputMaybe<Scalars['String']['input']>;
  Longitude?: InputMaybe<Scalars['Float']['input']>;
  Note?: InputMaybe<Scalars['String']['input']>;
  Prioritize?: InputMaybe<Scalars['Boolean']['input']>;
  SiteId?: InputMaybe<Scalars['String']['input']>;
  StartHour?: InputMaybe<Scalars['Int']['input']>;
  Status?: InputMaybe<Scalars['String']['input']>;
  TimeDelay?: InputMaybe<Scalars['Int']['input']>;
  Type?: InputMaybe<Scalars['String']['input']>;
};

export type SiteUpdateInput = {
  Available?: InputMaybe<Scalars['String']['input']>;
  DisplayGroup?: InputMaybe<Scalars['String']['input']>;
  IsDNP?: InputMaybe<Scalars['Boolean']['input']>;
  IsHWM?: InputMaybe<Scalars['Boolean']['input']>;
  IsManualMeter?: InputMaybe<Scalars['Boolean']['input']>;
  IsScadaMeter?: InputMaybe<Scalars['Boolean']['input']>;
  IsShowLabel?: InputMaybe<Scalars['Boolean']['input']>;
  Latitude?: InputMaybe<Scalars['Float']['input']>;
  Location?: InputMaybe<Scalars['String']['input']>;
  LoggerId?: InputMaybe<Scalars['String']['input']>;
  Longitude?: InputMaybe<Scalars['Float']['input']>;
  Note?: InputMaybe<Scalars['String']['input']>;
  Prioritize?: InputMaybe<Scalars['Boolean']['input']>;
  SiteId?: InputMaybe<Scalars['String']['input']>;
  StartHour?: InputMaybe<Scalars['Int']['input']>;
  Status?: InputMaybe<Scalars['String']['input']>;
  TimeDelay?: InputMaybe<Scalars['Int']['input']>;
  Type?: InputMaybe<Scalars['String']['input']>;
  _id: Scalars['ID']['input'];
};

export type TypeNode = {
  __typename?: 'TypeNode';
  Name?: Maybe<Scalars['String']['output']>;
  Type?: Maybe<Scalars['Int']['output']>;
  _id: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  Active?: Maybe<Scalars['Int']['output']>;
  ConsumerId?: Maybe<Scalars['String']['output']>;
  Email?: Maybe<Scalars['String']['output']>;
  Ip?: Maybe<Scalars['String']['output']>;
  Language?: Maybe<Scalars['String']['output']>;
  LoginTime?: Maybe<Scalars['Int']['output']>;
  Password?: Maybe<Scalars['String']['output']>;
  Role?: Maybe<Scalars['String']['output']>;
  Salt?: Maybe<Scalars['String']['output']>;
  StaffId?: Maybe<Scalars['String']['output']>;
  TimeStamp?: Maybe<Scalars['Date']['output']>;
  Username?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  pfm?: Maybe<Scalars['String']['output']>;
};

export type UserInsertInput = {
  Active?: InputMaybe<Scalars['Int']['input']>;
  ConsumerId?: InputMaybe<Scalars['String']['input']>;
  Email?: InputMaybe<Scalars['String']['input']>;
  Ip?: InputMaybe<Scalars['String']['input']>;
  Language?: InputMaybe<Scalars['String']['input']>;
  LoginTime?: InputMaybe<Scalars['Int']['input']>;
  Password?: InputMaybe<Scalars['String']['input']>;
  Role?: InputMaybe<Scalars['String']['input']>;
  Salt?: InputMaybe<Scalars['String']['input']>;
  StaffId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Username?: InputMaybe<Scalars['String']['input']>;
  pfm?: InputMaybe<Scalars['String']['input']>;
};

export type UserUpdateInput = {
  Active?: InputMaybe<Scalars['Int']['input']>;
  ConsumerId?: InputMaybe<Scalars['String']['input']>;
  Email?: InputMaybe<Scalars['String']['input']>;
  Ip?: InputMaybe<Scalars['String']['input']>;
  Language?: InputMaybe<Scalars['String']['input']>;
  LoginTime?: InputMaybe<Scalars['Int']['input']>;
  Password?: InputMaybe<Scalars['String']['input']>;
  Role?: InputMaybe<Scalars['String']['input']>;
  Salt?: InputMaybe<Scalars['String']['input']>;
  StaffId?: InputMaybe<Scalars['String']['input']>;
  TimeStamp?: InputMaybe<Scalars['Date']['input']>;
  Username?: InputMaybe<Scalars['String']['input']>;
  _id: Scalars['ID']['input'];
  pfm?: InputMaybe<Scalars['String']['input']>;
};

export type GetBranchsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBranchsQuery = { __typename?: 'Query', GetBranchs?: Array<{ __typename?: 'Branch', BranchId?: string | null, BranchName?: string | null, _id: string } | null> | null };

export type DeleteBranchMutationVariables = Exact<{
  branch?: InputMaybe<BranchUpdateInput>;
}>;


export type DeleteBranchMutation = { __typename?: 'Mutation', DeleteBranch?: number | null };

export type InsertBranchMutationVariables = Exact<{
  branch?: InputMaybe<BranchInsertInput>;
}>;


export type InsertBranchMutation = { __typename?: 'Mutation', InsertBranch?: string | null };

export type UpdateBranchMutationVariables = Exact<{
  branch?: InputMaybe<BranchUpdateInput>;
}>;


export type UpdateBranchMutation = { __typename?: 'Mutation', UpdateBranch?: number | null };

export type GetChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelsQuery = { __typename?: 'Query', GetChannels?: Array<{ __typename?: 'Channel', BaseLine?: number | null, ChannelId?: string | null, BaseMax?: number | null, BaseMin?: number | null, ChannelName?: string | null, ForwardFlow?: boolean | null, IndexTimeStamp?: any | null, LastIndex?: number | null, LastValue?: number | null, LoggerId?: string | null, OtherChannel?: boolean | null, Pressure1?: boolean | null, Pressure2?: boolean | null, ReverseFlow?: boolean | null, TimeStamp?: any | null, Unit?: string | null, _id: string }> | null };

export type InsertChannelMutationVariables = Exact<{
  channel?: InputMaybe<ChannelInsertInput>;
}>;


export type InsertChannelMutation = { __typename?: 'Mutation', InsertChannel?: string | null };

export type UpdateChannelMutationVariables = Exact<{
  channel?: InputMaybe<ChannelUpdateInput>;
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', UpdateChannel?: number | null };

export type UpdateValueChannelMutationVariables = Exact<{
  channel?: InputMaybe<ChannelValueUpdateInput>;
}>;


export type UpdateValueChannelMutation = { __typename?: 'Mutation', UpdateValueChannel?: number | null };

export type DeleteChannelMutationVariables = Exact<{
  channel?: InputMaybe<ChannelUpdateInput>;
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', DeleteChannel?: number | null };

export type GetChannelByLoggerIdQueryVariables = Exact<{
  loggerid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetChannelByLoggerIdQuery = { __typename?: 'Query', GetChannelByLoggerId?: Array<{ __typename?: 'Channel', BaseLine?: number | null, BaseMax?: number | null, BaseMin?: number | null, ChannelId?: string | null, ChannelName?: string | null, ForwardFlow?: boolean | null, IndexTimeStamp?: any | null, LastIndex?: number | null, LastValue?: number | null, LoggerId?: string | null, OtherChannel?: boolean | null, Pressure1?: boolean | null, ReverseFlow?: boolean | null, TimeStamp?: any | null, Unit?: string | null, _id: string, Pressure2?: boolean | null } | null> | null };

export type GetDailyDatasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDailyDatasQuery = { __typename?: 'Query', GetDailyDatas?: Array<{ __typename?: 'DailyData', ForwardFlow?: number | null, LoggerId?: string | null, Pressure1?: number | null, Pressure2?: number | null, ReverseFlow?: number | null, SiteId?: string | null, TimeStamp?: any | null, _id: string } | null> | null };

export type GetDailyDataByChannelTimeStampQueryVariables = Exact<{
  channelid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDailyDataByChannelTimeStampQuery = { __typename?: 'Query', GetDailyDataByChannelTimeStamp?: { __typename?: 'DataChart', BaseMax?: number | null, BaseMin?: number | null, ChannelId?: string | null, ChannelName?: string | null, Unit?: string | null, ListDataLogger?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null, _id?: string | null } | null> | null } | null };

export type GetDailyDataBySiteIdTimeStampQueryVariables = Exact<{
  loggerid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDailyDataBySiteIdTimeStampQuery = { __typename?: 'Query', GetDailyDataBySiteIdTimeStamp?: Array<{ __typename?: 'DataChart', BaseMax?: number | null, BaseMin?: number | null, ChannelId?: string | null, ChannelName?: string | null, Unit?: string | null, ListDataLogger?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null, _id?: string | null } | null> | null } | null> | null };

export type GetDataLoggerByTimeStampQueryVariables = Exact<{
  channelid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataLoggerByTimeStampQuery = { __typename?: 'Query', GetDataLoggerByTimeStamp?: { __typename?: 'DataChart', BaseMax?: number | null, BaseMin?: number | null, ChannelId?: string | null, ChannelName?: string | null, Unit?: string | null, ListDataLogger?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null } | null> | null } | null };

export type GetDataLoggerByCurrentTimeQueryVariables = Exact<{
  channelid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataLoggerByCurrentTimeQuery = { __typename?: 'Query', GetDataLoggerByCurrentTime?: { __typename?: 'DataChart', BaseMax?: number | null, BaseMin?: number | null, ChannelId?: string | null, ChannelName?: string | null, Unit?: string | null, ListDataLogger?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null } | null> | null } | null };

export type GetDataLoggerByCurrentTimeForManualDataQueryVariables = Exact<{
  channelid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataLoggerByCurrentTimeForManualDataQuery = { __typename?: 'Query', GetDataLoggerByCurrentTimeForManualData?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null, _id?: string | null } | null> | null };

export type GetDataLoggerByTimeStampForManualDataQueryVariables = Exact<{
  channelid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataLoggerByTimeStampForManualDataQuery = { __typename?: 'Query', GetDataLoggerByTimeStampForManualData?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, _id?: string | null, Value?: number | null } | null> | null };

export type GetDataLoggerOfSiteCurrentTimeQueryVariables = Exact<{
  loggerid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataLoggerOfSiteCurrentTimeQuery = { __typename?: 'Query', GetDataLoggerOfSiteCurrentTime?: Array<{ __typename?: 'DataChart', BaseMax?: number | null, BaseMin?: number | null, ChannelId?: string | null, ChannelName?: string | null, Unit?: string | null, ListDataLogger?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null, _id?: string | null } | null> | null } | null> | null };

export type GetDataLoggerOfSiteByTimeStampQueryVariables = Exact<{
  loggerid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataLoggerOfSiteByTimeStampQuery = { __typename?: 'Query', GetDataLoggerOfSiteByTimeStamp?: Array<{ __typename?: 'DataChart', BaseMax?: number | null, BaseMin?: number | null, ChannelId?: string | null, ChannelName?: string | null, Unit?: string | null, ListDataLogger?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null, _id?: string | null } | null> | null } | null> | null };

export type GetDataLoggerPressureByLoggerIdQueryVariables = Exact<{
  loggerid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataLoggerPressureByLoggerIdQuery = { __typename?: 'Query', GetDataLoggerPressureByLoggerId?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null, _id?: string | null } | null> | null };

export type InsertDataLoggerMutationVariables = Exact<{
  data?: InputMaybe<DataLoggerInsertInput>;
}>;


export type InsertDataLoggerMutation = { __typename?: 'Mutation', InsertDataLogger?: string | null };

export type UpdateDataLoggerMutationVariables = Exact<{
  data?: InputMaybe<DataLoggerUpdateInput>;
}>;


export type UpdateDataLoggerMutation = { __typename?: 'Mutation', UpdateDataLogger?: number | null };

export type DeleteDataLoggerMutationVariables = Exact<{
  data?: InputMaybe<DataLoggerUpdateInput>;
}>;


export type DeleteDataLoggerMutation = { __typename?: 'Mutation', DeleteDataLogger?: number | null };

export type GetDataManualsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataManualsQuery = { __typename?: 'Query', GetDataManuals?: Array<{ __typename?: 'DataManual', SiteId?: string | null, TimeStamp?: any | null, Value?: number | null, _id: string } | null> | null };

export type GetDataManualBySiteIdQueryVariables = Exact<{
  siteid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataManualBySiteIdQuery = { __typename?: 'Query', GetDataManualBySiteId?: Array<{ __typename?: 'DataManual', SiteId?: string | null, TimeStamp?: any | null, Value?: number | null, _id: string } | null> | null };

export type InsertDataManualMutationVariables = Exact<{
  data?: InputMaybe<DataManualInsertInput>;
}>;


export type InsertDataManualMutation = { __typename?: 'Mutation', InsertDataManual?: string | null };

export type UpdateDataManualMutationVariables = Exact<{
  data?: InputMaybe<DataManualUpdateInput>;
}>;


export type UpdateDataManualMutation = { __typename?: 'Mutation', UpdateDataManual?: number | null };

export type DeleteDataManualMutationVariables = Exact<{
  data?: InputMaybe<DataManualUpdateInput>;
}>;


export type DeleteDataManualMutation = { __typename?: 'Mutation', DeleteDataManual?: number | null };

export type GetDataTableCurrentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataTableCurrentQuery = { __typename?: 'Query', GetDataTableCurrent?: Array<{ __typename?: 'DataTable', ForwardFlow?: number | null, IndexForwardFlow?: number | null, Location?: string | null, IndexReverseFlow?: number | null, Pressure?: number | null, ReverseFlow?: number | null, STT?: number | null, SiteId?: string | null, TimeStamp?: any | null, Type?: number | null } | null> | null };

export type GetDisplayGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDisplayGroupsQuery = { __typename?: 'Query', GetDisplayGroups?: Array<{ __typename?: 'DisplayGroup', Group?: string | null, Name?: string | null, _id: string } | null> | null };

export type InsertDisplayGroupMutationVariables = Exact<{
  displayGroup?: InputMaybe<DisplayGroupInsertInput>;
}>;


export type InsertDisplayGroupMutation = { __typename?: 'Mutation', InsertDisplayGroup?: string | null };

export type UpdateDisplayGroupMutationVariables = Exact<{
  displayGroup?: InputMaybe<DisplayGroupUpdateInput>;
}>;


export type UpdateDisplayGroupMutation = { __typename?: 'Mutation', UpdateDisplayGroup?: number | null };

export type DeleteDisplayGroupMutationVariables = Exact<{
  displayGroup?: InputMaybe<DisplayGroupUpdateInput>;
}>;


export type DeleteDisplayGroupMutation = { __typename?: 'Mutation', DeleteDisplayGroup?: number | null };

export type GetDataDrawingPipeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataDrawingPipeQuery = { __typename?: 'Query', GetDataDrawingPipe?: Array<{ __typename?: 'DataDrawPipe', GroupPipeId?: string | null, GroupPipeName?: string | null, Pipes?: Array<{ __typename?: 'DrawPipe', BaseMax?: number | null, BaseMin?: number | null, Length?: number | null, PipeId?: string | null, PipeName?: string | null, Size?: number | null, TypeAlarmChannel?: string | null, Lines?: Array<{ __typename?: 'DrawLine', Color?: string | null, Lines?: Array<Array<number | null> | null> | null } | null> | null } | null> | null } | null> | null };

export type GetGroupPipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupPipesQuery = { __typename?: 'Query', GetGroupPipes?: Array<{ __typename?: 'GroupPipe', Description?: string | null, GroupPipeId?: string | null, Name?: string | null, Color?: string | null, _id: string, SiteIdStart?: string | null, SiteIdEnd?: string | null } | null> | null };

export type InsertGroupPipeMutationVariables = Exact<{
  groupPipe?: InputMaybe<GroupPipeInsertInput>;
}>;


export type InsertGroupPipeMutation = { __typename?: 'Mutation', InsertGroupPipe?: string | null };

export type UpdateGroupPipeMutationVariables = Exact<{
  groupPipe?: InputMaybe<GroupPipeUpdateInput>;
}>;


export type UpdateGroupPipeMutation = { __typename?: 'Mutation', UpdateGroupPipe?: number | null };

export type DeleteGroupPipeMutationVariables = Exact<{
  groupPipe?: InputMaybe<GroupPipeUpdateInput>;
}>;


export type DeleteGroupPipeMutation = { __typename?: 'Mutation', DeleteGroupPipe?: number | null };

export type GetIndexLoggerExactTimeQueryVariables = Exact<{
  time?: InputMaybe<Scalars['String']['input']>;
  channelid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetIndexLoggerExactTimeQuery = { __typename?: 'Query', GetIndexLoggerExactTime?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null, _id?: string | null } | null> | null };

export type GetIndexLoggerFilterTimeQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  channelid?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetIndexLoggerFilterTimeQuery = { __typename?: 'Query', GetIndexLoggerFilterTime?: Array<{ __typename?: 'DataLogger', TimeStamp?: any | null, Value?: number | null, _id?: string | null } | null> | null };

export type GetListPointBranchByBranchIdQueryVariables = Exact<{
  branchid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListPointBranchByBranchIdQuery = { __typename?: 'Query', GetListPointBranchByBranchId?: Array<{ __typename?: 'ListPointBranch', BranchId?: string | null, Level?: number | null, PointId?: string | null, _id: string } | null> | null };

export type UpdateListPointBranchMutationVariables = Exact<{
  list?: InputMaybe<ListPointBranchUpdateInput>;
}>;


export type UpdateListPointBranchMutation = { __typename?: 'Mutation', UpdateListPointBranch?: number | null };

export type GetListPointPipeByPipeIdQueryVariables = Exact<{
  pipeid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListPointPipeByPipeIdQuery = { __typename?: 'Query', GetListPointPipeByPipeId?: Array<{ __typename?: 'ListPointPipe', PipeId?: string | null, PointId?: string | null, STT?: number | null, _id: string } | null> | null };

export type UpdateListPointPipeMutationVariables = Exact<{
  list?: InputMaybe<ListPointPipeUpdateInput>;
}>;


export type UpdateListPointPipeMutation = { __typename?: 'Mutation', UpdateListPointPipe?: number | null };

export type LoginActionQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginActionQuery = { __typename?: 'Query', LoginAction?: { __typename?: 'Login', Role?: string | null, Username?: string | null, token?: string | null } | null };

export type VerifyTokenQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type VerifyTokenQuery = { __typename?: 'Query', VerifyToken?: string | null };

export type GetLostWaterBranchQueryVariables = Exact<{
  branchid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLostWaterBranchQuery = { __typename?: 'Query', GetLostWaterBranch?: Array<{ __typename?: 'LostBranch', Quantitylevel1?: number | null, Quantitylevel2?: number | null, TimeStamp?: any | null } | null> | null };

export type GetDataIndexManualsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataIndexManualsQuery = { __typename?: 'Query', GetDataIndexManuals?: Array<{ __typename?: 'ManualIndex', SiteId?: string | null, TimeStamp?: any | null, Value?: number | null, _id: string } | null> | null };

export type GetDataIndexManualBySiteIdQueryVariables = Exact<{
  siteid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataIndexManualBySiteIdQuery = { __typename?: 'Query', GetDataIndexManualBySiteId?: Array<{ __typename?: 'ManualIndex', SiteId?: string | null, TimeStamp?: any | null, Value?: number | null, _id: string } | null> | null };

export type InsertManualIndexMutationVariables = Exact<{
  data?: InputMaybe<ManualIndexInsertInput>;
}>;


export type InsertManualIndexMutation = { __typename?: 'Mutation', InsertManualIndex?: string | null };

export type UpdateManualIndexMutationVariables = Exact<{
  data?: InputMaybe<ManualIndexUpdateInput>;
}>;


export type UpdateManualIndexMutation = { __typename?: 'Mutation', UpdateManualIndex?: number | null };

export type DeleteManualIndexMutationVariables = Exact<{
  data?: InputMaybe<ManualIndexUpdateInput>;
}>;


export type DeleteManualIndexMutation = { __typename?: 'Mutation', DeleteManualIndex?: number | null };

export type GetNodeTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNodeTypesQuery = { __typename?: 'Query', GetNodeTypes?: Array<{ __typename?: 'TypeNode', Name?: string | null, Type?: number | null, _id: string }> | null };

export type GetPipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPipesQuery = { __typename?: 'Query', GetPipes?: Array<{ __typename?: 'Pipe', BaseMax?: number | null, BaseMin?: number | null, ColorBaseMax?: string | null, ColorBaseMin?: string | null, Description?: string | null, GroupPipeId?: string | null, Length?: number | null, Name?: string | null, PipeId?: string | null, Size?: number | null, TypeChannelAlarm?: string | null, _id: string, SetPrioritize?: number | null } | null> | null };

export type InsertPipeMutationVariables = Exact<{
  pipe?: InputMaybe<PipeInsertInput>;
}>;


export type InsertPipeMutation = { __typename?: 'Mutation', InsertPipe?: string | null };

export type UpdatePipeMutationVariables = Exact<{
  pipe?: InputMaybe<PipeUpdateInput>;
}>;


export type UpdatePipeMutation = { __typename?: 'Mutation', UpdatePipe?: number | null };

export type DeletePipeMutationVariables = Exact<{
  pipe?: InputMaybe<PipeUpdateInput>;
}>;


export type DeletePipeMutation = { __typename?: 'Mutation', DeletePipe?: number | null };

export type GetTotalQuantityByTimeStampQueryVariables = Exact<{
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTotalQuantityByTimeStampQuery = { __typename?: 'Query', GetTotalQuantityByTimeStamp?: number | null };

export type GetQuantityHourlyQueryVariables = Exact<{
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityHourlyQuery = { __typename?: 'Query', GetQuantityHourly?: Array<{ __typename?: 'QuantitySite', AvgFlow?: number | null, Index?: number | null, MaxFlow?: number | null, MinFlow?: number | null, Quantity?: number | null, TimeStamp?: any | null, AvgPressure?: number | null, MaxPressure?: number | null, MinPressure?: number | null } | null> | null };

export type GetQuantityDailyQueryVariables = Exact<{
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityDailyQuery = { __typename?: 'Query', GetQuantityDaily?: Array<{ __typename?: 'QuantitySite', AvgFlow?: number | null, Index?: number | null, MaxFlow?: number | null, MinFlow?: number | null, Quantity?: number | null, TimeStamp?: any | null, AvgPressure?: number | null, MaxPressure?: number | null, MinPressure?: number | null } | null> | null };

export type GetQuantityMonthlyQueryVariables = Exact<{
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityMonthlyQuery = { __typename?: 'Query', GetQuantityMonthly?: Array<{ __typename?: 'QuantitySite', AvgFlow?: number | null, Index?: number | null, MaxFlow?: number | null, MinFlow?: number | null, Quantity?: number | null, TimeStamp?: any | null, AvgPressure?: number | null, MaxPressure?: number | null, MinPressure?: number | null } | null> | null };

export type GetQuantityYearlyQueryVariables = Exact<{
  siteid?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityYearlyQuery = { __typename?: 'Query', GetQuantityYearly?: Array<{ __typename?: 'QuantitySite', AvgFlow?: number | null, Index?: number | null, MaxFlow?: number | null, MinFlow?: number | null, Quantity?: number | null, TimeStamp?: any | null, AvgPressure?: number | null, MaxPressure?: number | null, MinPressure?: number | null } | null> | null };

export type GetQuantityDailyNmQueryVariables = Exact<{
  year?: InputMaybe<Scalars['Int']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetQuantityDailyNmQuery = { __typename?: 'Query', GetQuantityDailyNM?: Array<{ __typename?: 'DataQuantityDailyNM', GD1?: number | null, GD2?: number | null, GD3?: number | null, TimeStamp?: any | null, Total?: number | null } | null> | null };

export type GetQuantityMonthlyNmQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityMonthlyNmQuery = { __typename?: 'Query', GetQuantityMonthlyNM?: Array<{ __typename?: 'DataQuantityMonthlyNM', AvgValue?: number | null, CountDay?: number | null, EndDate?: any | null, IsEnoughData?: boolean | null, StartDate?: any | null, TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetQuantityYearlyNmQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityYearlyNmQuery = { __typename?: 'Query', GetQuantityYearlyNM?: Array<{ __typename?: 'DataQuantityYearlyNM', AvgValue?: number | null, CountDay?: number | null, EndDate?: any | null, IsEnoughData?: boolean | null, StartDate?: any | null, TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetManualIndexDailyNmQueryVariables = Exact<{
  year?: InputMaybe<Scalars['Int']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetManualIndexDailyNmQuery = { __typename?: 'Query', GetManualIndexDailyNM?: Array<{ __typename?: 'DataQuantityDailyNM', GD1?: number | null, GD2?: number | null, GD3?: number | null, TimeStamp?: any | null, Total?: number | null } | null> | null };

export type GetManualIndexMonthlyNmQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetManualIndexMonthlyNmQuery = { __typename?: 'Query', GetManualIndexMonthlyNM?: Array<{ __typename?: 'DataQuantityMonthlyNM', AvgValue?: number | null, CountDay?: number | null, EndDate?: any | null, IsEnoughData?: boolean | null, StartDate?: any | null, TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetManualIndexYearlyNmQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetManualIndexYearlyNmQuery = { __typename?: 'Query', GetManualIndexYearlyNM?: Array<{ __typename?: 'DataQuantityYearlyNM', AvgValue?: number | null, CountDay?: number | null, EndDate?: any | null, IsEnoughData?: boolean | null, StartDate?: any | null, TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetQuantityDailyNtQueryVariables = Exact<{
  year?: InputMaybe<Scalars['Int']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetQuantityDailyNtQuery = { __typename?: 'Query', GetQuantityDailyNT?: Array<{ __typename?: 'DataQuantityDailyNT', GD1?: number | null, GD2?: number | null, GD3?: number | null, TimeStamp?: any | null, Total?: number | null } | null> | null };

export type GetQuantityMonthlyNtQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityMonthlyNtQuery = { __typename?: 'Query', GetQuantityMonthlyNT?: Array<{ __typename?: 'DataQuantityMonthlyNT', AvgValue?: number | null, CountDay?: number | null, EndDate?: any | null, IsEnoughData?: boolean | null, StartDate?: any | null, TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetQuantityYearlyNtQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityYearlyNtQuery = { __typename?: 'Query', GetQuantityYearlyNT?: Array<{ __typename?: 'DataQuantityYearlyNT', AvgValue?: number | null, CountDay?: number | null, EndDate?: any | null, IsEnoughData?: boolean | null, StartDate?: any | null, TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetManualIndexDailyNtQueryVariables = Exact<{
  year?: InputMaybe<Scalars['Int']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetManualIndexDailyNtQuery = { __typename?: 'Query', GetManualIndexDailyNT?: Array<{ __typename?: 'DataQuantityDailyNT', GD1?: number | null, GD2?: number | null, GD3?: number | null, TimeStamp?: any | null, Total?: number | null } | null> | null };

export type GetManualIndexMonthlyNtQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetManualIndexMonthlyNtQuery = { __typename?: 'Query', GetManualIndexMonthlyNT?: Array<{ __typename?: 'DataQuantityMonthlyNT', AvgValue?: number | null, CountDay?: number | null, EndDate?: any | null, IsEnoughData?: boolean | null, StartDate?: any | null, TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetManualIndexYearlyNtQueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetManualIndexYearlyNtQuery = { __typename?: 'Query', GetManualIndexYearlyNT?: Array<{ __typename?: 'DataQuantityYearlyNT', AvgValue?: number | null, CountDay?: number | null, EndDate?: any | null, IsEnoughData?: boolean | null, StartDate?: any | null, TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetQuantityDailyTb2QueryVariables = Exact<{
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetQuantityDailyTb2Query = { __typename?: 'Query', GetQuantityDailyTB2?: Array<{ __typename?: 'DataQuantityTB', TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetQuantityMonthlyTb2QueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityMonthlyTb2Query = { __typename?: 'Query', GetQuantityMonthlyTB2?: Array<{ __typename?: 'DataQuantityMonthlyTB', AvgValue?: number | null, CountDay?: number | null, TimeStamp?: any | null, Value?: number | null, IsEnoughData?: boolean | null, StartDate?: any | null, EndDate?: any | null } | null> | null };

export type GetQuantityYearlyTb2QueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuantityYearlyTb2Query = { __typename?: 'Query', GetQuantityYearlyTB2?: Array<{ __typename?: 'DataQuantityYearlyTB', AvgValue?: number | null, CountDay?: number | null, IsEnoughData?: boolean | null, TimeStamp?: any | null, Value?: number | null, StartDate?: any | null, EndDate?: any | null } | null> | null };

export type GetManualIndexDailyTb2QueryVariables = Exact<{
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetManualIndexDailyTb2Query = { __typename?: 'Query', GetManualIndexDailyTB2?: Array<{ __typename?: 'DataQuantityTB', TimeStamp?: any | null, Value?: number | null } | null> | null };

export type GetManualIndexMonthlyTb2QueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetManualIndexMonthlyTb2Query = { __typename?: 'Query', GetManualIndexMonthlyTB2?: Array<{ __typename?: 'DataQuantityMonthlyTB', AvgValue?: number | null, CountDay?: number | null, TimeStamp?: any | null, Value?: number | null, IsEnoughData?: boolean | null, StartDate?: any | null, EndDate?: any | null } | null> | null };

export type GetManualIndexYearlyTb2QueryVariables = Exact<{
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetManualIndexYearlyTb2Query = { __typename?: 'Query', GetManualIndexYearlyTB2?: Array<{ __typename?: 'DataQuantityYearlyTB', AvgValue?: number | null, CountDay?: number | null, IsEnoughData?: boolean | null, TimeStamp?: any | null, Value?: number | null, StartDate?: any | null, EndDate?: any | null } | null> | null };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', GetRoles?: Array<{ __typename?: 'Role', Description?: string | null, Role?: string | null, _id: string } | null> | null };

export type GetSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSitesQuery = { __typename?: 'Query', GetSites?: Array<{ __typename?: 'Site', Available?: string | null, DisplayGroup?: string | null, Latitude?: number | null, Location?: string | null, LoggerId?: string | null, Longitude?: number | null, Note?: string | null, SiteId?: string | null, Status?: string | null, Type?: number | null, _id: string, Prioritize?: boolean | null, IsScadaMeter?: boolean | null, IsManualMeter?: boolean | null, IsShowLabel?: boolean | null, TimeDelay?: number | null, IsDNP?: boolean | null, IsHWM?: boolean | null, StartHour?: number | null }> | null };

export type GetSiteIsMeterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteIsMeterQuery = { __typename?: 'Query', GetSiteIsMeter?: Array<{ __typename?: 'Site', Available?: string | null, DisplayGroup?: string | null, Latitude?: number | null, Location?: string | null, LoggerId?: string | null, Longitude?: number | null, Note?: string | null, Prioritize?: boolean | null, SiteId?: string | null, Status?: string | null, Type?: number | null, _id: string, IsScadaMeter?: boolean | null, IsManualMeter?: boolean | null, IsShowLabel?: boolean | null, TimeDelay?: number | null, IsDNP?: boolean | null, IsHWM?: boolean | null, StartHour?: number | null } | null> | null };

export type GetSiteIsMeterTotalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteIsMeterTotalQuery = { __typename?: 'Query', GetSiteIsMeterTotal?: Array<{ __typename?: 'Site', Available?: string | null, DisplayGroup?: string | null, Latitude?: number | null, Location?: string | null, LoggerId?: string | null, Longitude?: number | null, Note?: string | null, Prioritize?: boolean | null, SiteId?: string | null, Status?: string | null, Type?: number | null, _id: string, IsScadaMeter?: boolean | null, IsManualMeter?: boolean | null, IsShowLabel?: boolean | null, TimeDelay?: number | null, IsDNP?: boolean | null, IsHWM?: boolean | null, StartHour?: number | null } | null> | null };

export type GetSiteIsMeterTotalBranchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteIsMeterTotalBranchQuery = { __typename?: 'Query', GetSiteIsMeterTotalBranch?: Array<{ __typename?: 'Site', Available?: string | null, DisplayGroup?: string | null, Latitude?: number | null, Location?: string | null, Longitude?: number | null, LoggerId?: string | null, Prioritize?: boolean | null, Note?: string | null, SiteId?: string | null, Status?: string | null, Type?: number | null, _id: string, IsScadaMeter?: boolean | null, IsManualMeter?: boolean | null, IsShowLabel?: boolean | null, TimeDelay?: number | null, IsDNP?: boolean | null, IsHWM?: boolean | null, StartHour?: number | null } | null> | null };

export type GetSiteIsManualMeterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteIsManualMeterQuery = { __typename?: 'Query', GetSiteIsManualMeter?: Array<{ __typename?: 'Site', Available?: string | null, DisplayGroup?: string | null, IsManualMeter?: boolean | null, IsScadaMeter?: boolean | null, Latitude?: number | null, Location?: string | null, LoggerId?: string | null, Longitude?: number | null, Note?: string | null, Prioritize?: boolean | null, SiteId?: string | null, Status?: string | null, _id: string, Type?: number | null, IsShowLabel?: boolean | null, TimeDelay?: number | null, IsDNP?: boolean | null, IsHWM?: boolean | null, StartHour?: number | null } | null> | null };

export type InsertSiteMutationVariables = Exact<{
  site?: InputMaybe<SiteInsertInput>;
}>;


export type InsertSiteMutation = { __typename?: 'Mutation', InsertSite?: string | null };

export type UpdateSiteMutationVariables = Exact<{
  site?: InputMaybe<SiteUpdateInput>;
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', UpdateSite?: number | null };

export type DeleteSiteMutationVariables = Exact<{
  site?: InputMaybe<SiteUpdateInput>;
}>;


export type DeleteSiteMutation = { __typename?: 'Mutation', DeleteSite?: number | null };

export type GetSiteAndChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteAndChannelQuery = { __typename?: 'Query', GetSiteAndChannel?: Array<{ __typename?: 'SiteAndChannel', Available?: string | null, DisplayGroup?: string | null, Latitude?: number | null, Location?: string | null, LoggerId?: string | null, Longitude?: number | null, Note?: string | null, Prioritize?: boolean | null, SiteId?: string | null, Status?: string | null, StatusError?: number | null, Type?: number | null, _id: string, IsScadaMeter?: boolean | null, IsManualMeter?: boolean | null, IsShowLabel?: boolean | null, LengthPipe?: number | null, PipeName?: string | null, PipeId?: string | null, SizePipe?: number | null, Channels?: Array<{ __typename?: 'Channel', BaseMin?: number | null, BaseLine?: number | null, BaseMax?: number | null, ChannelId?: string | null, ChannelName?: string | null, ForwardFlow?: boolean | null, IndexTimeStamp?: any | null, LastIndex?: number | null, LastValue?: number | null, LoggerId?: string | null, OtherChannel?: boolean | null, Pressure1?: boolean | null, Pressure2?: boolean | null, ReverseFlow?: boolean | null, TimeStamp?: any | null, Unit?: string | null, _id: string } | null> | null }> | null };

export type GetDataQuantityAndIndexManualQueryVariables = Exact<{
  time?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDataQuantityAndIndexManualQuery = { __typename?: 'Query', GetDataQuantityAndIndexManual?: Array<{ __typename?: 'SiteAndManualIndex', IdManualIndex?: string | null, IndexManual?: number | null, Location?: string | null, Quantity?: number | null, SiteId?: string | null } | null> | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', GetUsers?: Array<{ __typename?: 'User', Active?: number | null, ConsumerId?: string | null, Ip?: string | null, Email?: string | null, Language?: string | null, LoginTime?: number | null, Password?: string | null, Role?: string | null, Salt?: string | null, StaffId?: string | null, TimeStamp?: any | null, Username?: string | null, _id: string, pfm?: string | null } | null> | null };

export type GetUserByUsernameQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserByUsernameQuery = { __typename?: 'Query', GetUserByUsername?: Array<{ __typename?: 'User', Active?: number | null, ConsumerId?: string | null, Email?: string | null, Ip?: string | null, Language?: string | null, LoginTime?: number | null, Password?: string | null, Role?: string | null, Salt?: string | null, StaffId?: string | null, TimeStamp?: any | null, Username?: string | null, _id: string, pfm?: string | null } | null> | null };

export type VerifyPasswordQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type VerifyPasswordQuery = { __typename?: 'Query', VerifyPassword?: boolean | null };

export type InsertUserMutationVariables = Exact<{
  user?: InputMaybe<UserInsertInput>;
}>;


export type InsertUserMutation = { __typename?: 'Mutation', InsertUser?: string | null };

export type UpdateUserMutationVariables = Exact<{
  user?: InputMaybe<UserUpdateInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', UpdateUser?: number | null };

export type DeleteUserMutationVariables = Exact<{
  user?: InputMaybe<UserUpdateInput>;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', DeleteUser?: number | null };


export const GetBranchsDocument = gql`
    query GetBranchs {
  GetBranchs {
    BranchId
    BranchName
    _id
  }
}
    `;

/**
 * __useGetBranchsQuery__
 *
 * To run a query within a React component, call `useGetBranchsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBranchsQuery(baseOptions?: Apollo.QueryHookOptions<GetBranchsQuery, GetBranchsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBranchsQuery, GetBranchsQueryVariables>(GetBranchsDocument, options);
      }
export function useGetBranchsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBranchsQuery, GetBranchsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBranchsQuery, GetBranchsQueryVariables>(GetBranchsDocument, options);
        }
export function useGetBranchsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBranchsQuery, GetBranchsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBranchsQuery, GetBranchsQueryVariables>(GetBranchsDocument, options);
        }
export type GetBranchsQueryHookResult = ReturnType<typeof useGetBranchsQuery>;
export type GetBranchsLazyQueryHookResult = ReturnType<typeof useGetBranchsLazyQuery>;
export type GetBranchsSuspenseQueryHookResult = ReturnType<typeof useGetBranchsSuspenseQuery>;
export type GetBranchsQueryResult = Apollo.QueryResult<GetBranchsQuery, GetBranchsQueryVariables>;
export function refetchGetBranchsQuery(variables?: GetBranchsQueryVariables) {
      return { query: GetBranchsDocument, variables: variables }
    }
export const DeleteBranchDocument = gql`
    mutation DeleteBranch($branch: BranchUpdateInput) {
  DeleteBranch(branch: $branch)
}
    `;
export type DeleteBranchMutationFn = Apollo.MutationFunction<DeleteBranchMutation, DeleteBranchMutationVariables>;

/**
 * __useDeleteBranchMutation__
 *
 * To run a mutation, you first call `useDeleteBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBranchMutation, { data, loading, error }] = useDeleteBranchMutation({
 *   variables: {
 *      branch: // value for 'branch'
 *   },
 * });
 */
export function useDeleteBranchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBranchMutation, DeleteBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBranchMutation, DeleteBranchMutationVariables>(DeleteBranchDocument, options);
      }
export type DeleteBranchMutationHookResult = ReturnType<typeof useDeleteBranchMutation>;
export type DeleteBranchMutationResult = Apollo.MutationResult<DeleteBranchMutation>;
export type DeleteBranchMutationOptions = Apollo.BaseMutationOptions<DeleteBranchMutation, DeleteBranchMutationVariables>;
export const InsertBranchDocument = gql`
    mutation InsertBranch($branch: BranchInsertInput) {
  InsertBranch(branch: $branch)
}
    `;
export type InsertBranchMutationFn = Apollo.MutationFunction<InsertBranchMutation, InsertBranchMutationVariables>;

/**
 * __useInsertBranchMutation__
 *
 * To run a mutation, you first call `useInsertBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertBranchMutation, { data, loading, error }] = useInsertBranchMutation({
 *   variables: {
 *      branch: // value for 'branch'
 *   },
 * });
 */
export function useInsertBranchMutation(baseOptions?: Apollo.MutationHookOptions<InsertBranchMutation, InsertBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertBranchMutation, InsertBranchMutationVariables>(InsertBranchDocument, options);
      }
export type InsertBranchMutationHookResult = ReturnType<typeof useInsertBranchMutation>;
export type InsertBranchMutationResult = Apollo.MutationResult<InsertBranchMutation>;
export type InsertBranchMutationOptions = Apollo.BaseMutationOptions<InsertBranchMutation, InsertBranchMutationVariables>;
export const UpdateBranchDocument = gql`
    mutation UpdateBranch($branch: BranchUpdateInput) {
  UpdateBranch(branch: $branch)
}
    `;
export type UpdateBranchMutationFn = Apollo.MutationFunction<UpdateBranchMutation, UpdateBranchMutationVariables>;

/**
 * __useUpdateBranchMutation__
 *
 * To run a mutation, you first call `useUpdateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBranchMutation, { data, loading, error }] = useUpdateBranchMutation({
 *   variables: {
 *      branch: // value for 'branch'
 *   },
 * });
 */
export function useUpdateBranchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBranchMutation, UpdateBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBranchMutation, UpdateBranchMutationVariables>(UpdateBranchDocument, options);
      }
export type UpdateBranchMutationHookResult = ReturnType<typeof useUpdateBranchMutation>;
export type UpdateBranchMutationResult = Apollo.MutationResult<UpdateBranchMutation>;
export type UpdateBranchMutationOptions = Apollo.BaseMutationOptions<UpdateBranchMutation, UpdateBranchMutationVariables>;
export const GetChannelsDocument = gql`
    query GetChannels {
  GetChannels {
    BaseLine
    ChannelId
    BaseMax
    BaseMin
    ChannelName
    ForwardFlow
    IndexTimeStamp
    LastIndex
    LastValue
    LoggerId
    OtherChannel
    Pressure1
    Pressure2
    ReverseFlow
    TimeStamp
    Unit
    _id
  }
}
    `;

/**
 * __useGetChannelsQuery__
 *
 * To run a query within a React component, call `useGetChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
      }
export function useGetChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
        }
export function useGetChannelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
        }
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>;
export type GetChannelsLazyQueryHookResult = ReturnType<typeof useGetChannelsLazyQuery>;
export type GetChannelsSuspenseQueryHookResult = ReturnType<typeof useGetChannelsSuspenseQuery>;
export type GetChannelsQueryResult = Apollo.QueryResult<GetChannelsQuery, GetChannelsQueryVariables>;
export function refetchGetChannelsQuery(variables?: GetChannelsQueryVariables) {
      return { query: GetChannelsDocument, variables: variables }
    }
export const InsertChannelDocument = gql`
    mutation InsertChannel($channel: ChannelInsertInput) {
  InsertChannel(channel: $channel)
}
    `;
export type InsertChannelMutationFn = Apollo.MutationFunction<InsertChannelMutation, InsertChannelMutationVariables>;

/**
 * __useInsertChannelMutation__
 *
 * To run a mutation, you first call `useInsertChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertChannelMutation, { data, loading, error }] = useInsertChannelMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useInsertChannelMutation(baseOptions?: Apollo.MutationHookOptions<InsertChannelMutation, InsertChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertChannelMutation, InsertChannelMutationVariables>(InsertChannelDocument, options);
      }
export type InsertChannelMutationHookResult = ReturnType<typeof useInsertChannelMutation>;
export type InsertChannelMutationResult = Apollo.MutationResult<InsertChannelMutation>;
export type InsertChannelMutationOptions = Apollo.BaseMutationOptions<InsertChannelMutation, InsertChannelMutationVariables>;
export const UpdateChannelDocument = gql`
    mutation UpdateChannel($channel: ChannelUpdateInput) {
  UpdateChannel(channel: $channel)
}
    `;
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;

/**
 * __useUpdateChannelMutation__
 *
 * To run a mutation, you first call `useUpdateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelMutation, { data, loading, error }] = useUpdateChannelMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useUpdateChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, options);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export type UpdateChannelMutationResult = Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const UpdateValueChannelDocument = gql`
    mutation UpdateValueChannel($channel: ChannelValueUpdateInput) {
  UpdateValueChannel(channel: $channel)
}
    `;
export type UpdateValueChannelMutationFn = Apollo.MutationFunction<UpdateValueChannelMutation, UpdateValueChannelMutationVariables>;

/**
 * __useUpdateValueChannelMutation__
 *
 * To run a mutation, you first call `useUpdateValueChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateValueChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateValueChannelMutation, { data, loading, error }] = useUpdateValueChannelMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useUpdateValueChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateValueChannelMutation, UpdateValueChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateValueChannelMutation, UpdateValueChannelMutationVariables>(UpdateValueChannelDocument, options);
      }
export type UpdateValueChannelMutationHookResult = ReturnType<typeof useUpdateValueChannelMutation>;
export type UpdateValueChannelMutationResult = Apollo.MutationResult<UpdateValueChannelMutation>;
export type UpdateValueChannelMutationOptions = Apollo.BaseMutationOptions<UpdateValueChannelMutation, UpdateValueChannelMutationVariables>;
export const DeleteChannelDocument = gql`
    mutation DeleteChannel($channel: ChannelUpdateInput) {
  DeleteChannel(channel: $channel)
}
    `;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, options);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const GetChannelByLoggerIdDocument = gql`
    query GetChannelByLoggerId($loggerid: String) {
  GetChannelByLoggerId(loggerid: $loggerid) {
    BaseLine
    BaseMax
    BaseMin
    ChannelId
    ChannelName
    ForwardFlow
    IndexTimeStamp
    LastIndex
    LastValue
    LoggerId
    OtherChannel
    Pressure1
    ReverseFlow
    TimeStamp
    Unit
    _id
    Pressure2
  }
}
    `;

/**
 * __useGetChannelByLoggerIdQuery__
 *
 * To run a query within a React component, call `useGetChannelByLoggerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelByLoggerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelByLoggerIdQuery({
 *   variables: {
 *      loggerid: // value for 'loggerid'
 *   },
 * });
 */
export function useGetChannelByLoggerIdQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelByLoggerIdQuery, GetChannelByLoggerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelByLoggerIdQuery, GetChannelByLoggerIdQueryVariables>(GetChannelByLoggerIdDocument, options);
      }
export function useGetChannelByLoggerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelByLoggerIdQuery, GetChannelByLoggerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelByLoggerIdQuery, GetChannelByLoggerIdQueryVariables>(GetChannelByLoggerIdDocument, options);
        }
export function useGetChannelByLoggerIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChannelByLoggerIdQuery, GetChannelByLoggerIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChannelByLoggerIdQuery, GetChannelByLoggerIdQueryVariables>(GetChannelByLoggerIdDocument, options);
        }
export type GetChannelByLoggerIdQueryHookResult = ReturnType<typeof useGetChannelByLoggerIdQuery>;
export type GetChannelByLoggerIdLazyQueryHookResult = ReturnType<typeof useGetChannelByLoggerIdLazyQuery>;
export type GetChannelByLoggerIdSuspenseQueryHookResult = ReturnType<typeof useGetChannelByLoggerIdSuspenseQuery>;
export type GetChannelByLoggerIdQueryResult = Apollo.QueryResult<GetChannelByLoggerIdQuery, GetChannelByLoggerIdQueryVariables>;
export function refetchGetChannelByLoggerIdQuery(variables?: GetChannelByLoggerIdQueryVariables) {
      return { query: GetChannelByLoggerIdDocument, variables: variables }
    }
export const GetDailyDatasDocument = gql`
    query GetDailyDatas {
  GetDailyDatas {
    ForwardFlow
    LoggerId
    Pressure1
    Pressure2
    ReverseFlow
    SiteId
    TimeStamp
    _id
  }
}
    `;

/**
 * __useGetDailyDatasQuery__
 *
 * To run a query within a React component, call `useGetDailyDatasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyDatasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyDatasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDailyDatasQuery(baseOptions?: Apollo.QueryHookOptions<GetDailyDatasQuery, GetDailyDatasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailyDatasQuery, GetDailyDatasQueryVariables>(GetDailyDatasDocument, options);
      }
export function useGetDailyDatasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyDatasQuery, GetDailyDatasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailyDatasQuery, GetDailyDatasQueryVariables>(GetDailyDatasDocument, options);
        }
export function useGetDailyDatasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDailyDatasQuery, GetDailyDatasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDailyDatasQuery, GetDailyDatasQueryVariables>(GetDailyDatasDocument, options);
        }
export type GetDailyDatasQueryHookResult = ReturnType<typeof useGetDailyDatasQuery>;
export type GetDailyDatasLazyQueryHookResult = ReturnType<typeof useGetDailyDatasLazyQuery>;
export type GetDailyDatasSuspenseQueryHookResult = ReturnType<typeof useGetDailyDatasSuspenseQuery>;
export type GetDailyDatasQueryResult = Apollo.QueryResult<GetDailyDatasQuery, GetDailyDatasQueryVariables>;
export function refetchGetDailyDatasQuery(variables?: GetDailyDatasQueryVariables) {
      return { query: GetDailyDatasDocument, variables: variables }
    }
export const GetDailyDataByChannelTimeStampDocument = gql`
    query GetDailyDataByChannelTimeStamp($channelid: String, $start: String, $end: String) {
  GetDailyDataByChannelTimeStamp(channelid: $channelid, start: $start, end: $end) {
    BaseMax
    BaseMin
    ChannelId
    ChannelName
    ListDataLogger {
      TimeStamp
      Value
      _id
    }
    Unit
  }
}
    `;

/**
 * __useGetDailyDataByChannelTimeStampQuery__
 *
 * To run a query within a React component, call `useGetDailyDataByChannelTimeStampQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyDataByChannelTimeStampQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyDataByChannelTimeStampQuery({
 *   variables: {
 *      channelid: // value for 'channelid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetDailyDataByChannelTimeStampQuery(baseOptions?: Apollo.QueryHookOptions<GetDailyDataByChannelTimeStampQuery, GetDailyDataByChannelTimeStampQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailyDataByChannelTimeStampQuery, GetDailyDataByChannelTimeStampQueryVariables>(GetDailyDataByChannelTimeStampDocument, options);
      }
export function useGetDailyDataByChannelTimeStampLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyDataByChannelTimeStampQuery, GetDailyDataByChannelTimeStampQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailyDataByChannelTimeStampQuery, GetDailyDataByChannelTimeStampQueryVariables>(GetDailyDataByChannelTimeStampDocument, options);
        }
export function useGetDailyDataByChannelTimeStampSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDailyDataByChannelTimeStampQuery, GetDailyDataByChannelTimeStampQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDailyDataByChannelTimeStampQuery, GetDailyDataByChannelTimeStampQueryVariables>(GetDailyDataByChannelTimeStampDocument, options);
        }
export type GetDailyDataByChannelTimeStampQueryHookResult = ReturnType<typeof useGetDailyDataByChannelTimeStampQuery>;
export type GetDailyDataByChannelTimeStampLazyQueryHookResult = ReturnType<typeof useGetDailyDataByChannelTimeStampLazyQuery>;
export type GetDailyDataByChannelTimeStampSuspenseQueryHookResult = ReturnType<typeof useGetDailyDataByChannelTimeStampSuspenseQuery>;
export type GetDailyDataByChannelTimeStampQueryResult = Apollo.QueryResult<GetDailyDataByChannelTimeStampQuery, GetDailyDataByChannelTimeStampQueryVariables>;
export function refetchGetDailyDataByChannelTimeStampQuery(variables?: GetDailyDataByChannelTimeStampQueryVariables) {
      return { query: GetDailyDataByChannelTimeStampDocument, variables: variables }
    }
export const GetDailyDataBySiteIdTimeStampDocument = gql`
    query GetDailyDataBySiteIdTimeStamp($loggerid: String, $start: String, $end: String) {
  GetDailyDataBySiteIdTimeStamp(loggerid: $loggerid, start: $start, end: $end) {
    BaseMax
    BaseMin
    ChannelId
    ChannelName
    ListDataLogger {
      TimeStamp
      Value
      _id
    }
    Unit
  }
}
    `;

/**
 * __useGetDailyDataBySiteIdTimeStampQuery__
 *
 * To run a query within a React component, call `useGetDailyDataBySiteIdTimeStampQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyDataBySiteIdTimeStampQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyDataBySiteIdTimeStampQuery({
 *   variables: {
 *      loggerid: // value for 'loggerid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetDailyDataBySiteIdTimeStampQuery(baseOptions?: Apollo.QueryHookOptions<GetDailyDataBySiteIdTimeStampQuery, GetDailyDataBySiteIdTimeStampQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailyDataBySiteIdTimeStampQuery, GetDailyDataBySiteIdTimeStampQueryVariables>(GetDailyDataBySiteIdTimeStampDocument, options);
      }
export function useGetDailyDataBySiteIdTimeStampLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyDataBySiteIdTimeStampQuery, GetDailyDataBySiteIdTimeStampQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailyDataBySiteIdTimeStampQuery, GetDailyDataBySiteIdTimeStampQueryVariables>(GetDailyDataBySiteIdTimeStampDocument, options);
        }
export function useGetDailyDataBySiteIdTimeStampSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDailyDataBySiteIdTimeStampQuery, GetDailyDataBySiteIdTimeStampQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDailyDataBySiteIdTimeStampQuery, GetDailyDataBySiteIdTimeStampQueryVariables>(GetDailyDataBySiteIdTimeStampDocument, options);
        }
export type GetDailyDataBySiteIdTimeStampQueryHookResult = ReturnType<typeof useGetDailyDataBySiteIdTimeStampQuery>;
export type GetDailyDataBySiteIdTimeStampLazyQueryHookResult = ReturnType<typeof useGetDailyDataBySiteIdTimeStampLazyQuery>;
export type GetDailyDataBySiteIdTimeStampSuspenseQueryHookResult = ReturnType<typeof useGetDailyDataBySiteIdTimeStampSuspenseQuery>;
export type GetDailyDataBySiteIdTimeStampQueryResult = Apollo.QueryResult<GetDailyDataBySiteIdTimeStampQuery, GetDailyDataBySiteIdTimeStampQueryVariables>;
export function refetchGetDailyDataBySiteIdTimeStampQuery(variables?: GetDailyDataBySiteIdTimeStampQueryVariables) {
      return { query: GetDailyDataBySiteIdTimeStampDocument, variables: variables }
    }
export const GetDataLoggerByTimeStampDocument = gql`
    query GetDataLoggerByTimeStamp($channelid: String, $start: String, $end: String) {
  GetDataLoggerByTimeStamp(channelid: $channelid, start: $start, end: $end) {
    BaseMax
    BaseMin
    ChannelId
    ChannelName
    ListDataLogger {
      TimeStamp
      Value
    }
    Unit
  }
}
    `;

/**
 * __useGetDataLoggerByTimeStampQuery__
 *
 * To run a query within a React component, call `useGetDataLoggerByTimeStampQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataLoggerByTimeStampQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataLoggerByTimeStampQuery({
 *   variables: {
 *      channelid: // value for 'channelid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetDataLoggerByTimeStampQuery(baseOptions?: Apollo.QueryHookOptions<GetDataLoggerByTimeStampQuery, GetDataLoggerByTimeStampQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataLoggerByTimeStampQuery, GetDataLoggerByTimeStampQueryVariables>(GetDataLoggerByTimeStampDocument, options);
      }
export function useGetDataLoggerByTimeStampLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataLoggerByTimeStampQuery, GetDataLoggerByTimeStampQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataLoggerByTimeStampQuery, GetDataLoggerByTimeStampQueryVariables>(GetDataLoggerByTimeStampDocument, options);
        }
export function useGetDataLoggerByTimeStampSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataLoggerByTimeStampQuery, GetDataLoggerByTimeStampQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataLoggerByTimeStampQuery, GetDataLoggerByTimeStampQueryVariables>(GetDataLoggerByTimeStampDocument, options);
        }
export type GetDataLoggerByTimeStampQueryHookResult = ReturnType<typeof useGetDataLoggerByTimeStampQuery>;
export type GetDataLoggerByTimeStampLazyQueryHookResult = ReturnType<typeof useGetDataLoggerByTimeStampLazyQuery>;
export type GetDataLoggerByTimeStampSuspenseQueryHookResult = ReturnType<typeof useGetDataLoggerByTimeStampSuspenseQuery>;
export type GetDataLoggerByTimeStampQueryResult = Apollo.QueryResult<GetDataLoggerByTimeStampQuery, GetDataLoggerByTimeStampQueryVariables>;
export function refetchGetDataLoggerByTimeStampQuery(variables?: GetDataLoggerByTimeStampQueryVariables) {
      return { query: GetDataLoggerByTimeStampDocument, variables: variables }
    }
export const GetDataLoggerByCurrentTimeDocument = gql`
    query GetDataLoggerByCurrentTime($channelid: String) {
  GetDataLoggerByCurrentTime(channelid: $channelid) {
    BaseMax
    BaseMin
    ChannelId
    ChannelName
    ListDataLogger {
      TimeStamp
      Value
    }
    Unit
  }
}
    `;

/**
 * __useGetDataLoggerByCurrentTimeQuery__
 *
 * To run a query within a React component, call `useGetDataLoggerByCurrentTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataLoggerByCurrentTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataLoggerByCurrentTimeQuery({
 *   variables: {
 *      channelid: // value for 'channelid'
 *   },
 * });
 */
export function useGetDataLoggerByCurrentTimeQuery(baseOptions?: Apollo.QueryHookOptions<GetDataLoggerByCurrentTimeQuery, GetDataLoggerByCurrentTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataLoggerByCurrentTimeQuery, GetDataLoggerByCurrentTimeQueryVariables>(GetDataLoggerByCurrentTimeDocument, options);
      }
export function useGetDataLoggerByCurrentTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataLoggerByCurrentTimeQuery, GetDataLoggerByCurrentTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataLoggerByCurrentTimeQuery, GetDataLoggerByCurrentTimeQueryVariables>(GetDataLoggerByCurrentTimeDocument, options);
        }
export function useGetDataLoggerByCurrentTimeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataLoggerByCurrentTimeQuery, GetDataLoggerByCurrentTimeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataLoggerByCurrentTimeQuery, GetDataLoggerByCurrentTimeQueryVariables>(GetDataLoggerByCurrentTimeDocument, options);
        }
export type GetDataLoggerByCurrentTimeQueryHookResult = ReturnType<typeof useGetDataLoggerByCurrentTimeQuery>;
export type GetDataLoggerByCurrentTimeLazyQueryHookResult = ReturnType<typeof useGetDataLoggerByCurrentTimeLazyQuery>;
export type GetDataLoggerByCurrentTimeSuspenseQueryHookResult = ReturnType<typeof useGetDataLoggerByCurrentTimeSuspenseQuery>;
export type GetDataLoggerByCurrentTimeQueryResult = Apollo.QueryResult<GetDataLoggerByCurrentTimeQuery, GetDataLoggerByCurrentTimeQueryVariables>;
export function refetchGetDataLoggerByCurrentTimeQuery(variables?: GetDataLoggerByCurrentTimeQueryVariables) {
      return { query: GetDataLoggerByCurrentTimeDocument, variables: variables }
    }
export const GetDataLoggerByCurrentTimeForManualDataDocument = gql`
    query GetDataLoggerByCurrentTimeForManualData($channelid: String) {
  GetDataLoggerByCurrentTimeForManualData(channelid: $channelid) {
    TimeStamp
    Value
    _id
  }
}
    `;

/**
 * __useGetDataLoggerByCurrentTimeForManualDataQuery__
 *
 * To run a query within a React component, call `useGetDataLoggerByCurrentTimeForManualDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataLoggerByCurrentTimeForManualDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataLoggerByCurrentTimeForManualDataQuery({
 *   variables: {
 *      channelid: // value for 'channelid'
 *   },
 * });
 */
export function useGetDataLoggerByCurrentTimeForManualDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDataLoggerByCurrentTimeForManualDataQuery, GetDataLoggerByCurrentTimeForManualDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataLoggerByCurrentTimeForManualDataQuery, GetDataLoggerByCurrentTimeForManualDataQueryVariables>(GetDataLoggerByCurrentTimeForManualDataDocument, options);
      }
export function useGetDataLoggerByCurrentTimeForManualDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataLoggerByCurrentTimeForManualDataQuery, GetDataLoggerByCurrentTimeForManualDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataLoggerByCurrentTimeForManualDataQuery, GetDataLoggerByCurrentTimeForManualDataQueryVariables>(GetDataLoggerByCurrentTimeForManualDataDocument, options);
        }
export function useGetDataLoggerByCurrentTimeForManualDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataLoggerByCurrentTimeForManualDataQuery, GetDataLoggerByCurrentTimeForManualDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataLoggerByCurrentTimeForManualDataQuery, GetDataLoggerByCurrentTimeForManualDataQueryVariables>(GetDataLoggerByCurrentTimeForManualDataDocument, options);
        }
export type GetDataLoggerByCurrentTimeForManualDataQueryHookResult = ReturnType<typeof useGetDataLoggerByCurrentTimeForManualDataQuery>;
export type GetDataLoggerByCurrentTimeForManualDataLazyQueryHookResult = ReturnType<typeof useGetDataLoggerByCurrentTimeForManualDataLazyQuery>;
export type GetDataLoggerByCurrentTimeForManualDataSuspenseQueryHookResult = ReturnType<typeof useGetDataLoggerByCurrentTimeForManualDataSuspenseQuery>;
export type GetDataLoggerByCurrentTimeForManualDataQueryResult = Apollo.QueryResult<GetDataLoggerByCurrentTimeForManualDataQuery, GetDataLoggerByCurrentTimeForManualDataQueryVariables>;
export function refetchGetDataLoggerByCurrentTimeForManualDataQuery(variables?: GetDataLoggerByCurrentTimeForManualDataQueryVariables) {
      return { query: GetDataLoggerByCurrentTimeForManualDataDocument, variables: variables }
    }
export const GetDataLoggerByTimeStampForManualDataDocument = gql`
    query GetDataLoggerByTimeStampForManualData($channelid: String, $start: String, $end: String) {
  GetDataLoggerByTimeStampForManualData(
    channelid: $channelid
    start: $start
    end: $end
  ) {
    TimeStamp
    _id
    Value
  }
}
    `;

/**
 * __useGetDataLoggerByTimeStampForManualDataQuery__
 *
 * To run a query within a React component, call `useGetDataLoggerByTimeStampForManualDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataLoggerByTimeStampForManualDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataLoggerByTimeStampForManualDataQuery({
 *   variables: {
 *      channelid: // value for 'channelid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetDataLoggerByTimeStampForManualDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDataLoggerByTimeStampForManualDataQuery, GetDataLoggerByTimeStampForManualDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataLoggerByTimeStampForManualDataQuery, GetDataLoggerByTimeStampForManualDataQueryVariables>(GetDataLoggerByTimeStampForManualDataDocument, options);
      }
export function useGetDataLoggerByTimeStampForManualDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataLoggerByTimeStampForManualDataQuery, GetDataLoggerByTimeStampForManualDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataLoggerByTimeStampForManualDataQuery, GetDataLoggerByTimeStampForManualDataQueryVariables>(GetDataLoggerByTimeStampForManualDataDocument, options);
        }
export function useGetDataLoggerByTimeStampForManualDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataLoggerByTimeStampForManualDataQuery, GetDataLoggerByTimeStampForManualDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataLoggerByTimeStampForManualDataQuery, GetDataLoggerByTimeStampForManualDataQueryVariables>(GetDataLoggerByTimeStampForManualDataDocument, options);
        }
export type GetDataLoggerByTimeStampForManualDataQueryHookResult = ReturnType<typeof useGetDataLoggerByTimeStampForManualDataQuery>;
export type GetDataLoggerByTimeStampForManualDataLazyQueryHookResult = ReturnType<typeof useGetDataLoggerByTimeStampForManualDataLazyQuery>;
export type GetDataLoggerByTimeStampForManualDataSuspenseQueryHookResult = ReturnType<typeof useGetDataLoggerByTimeStampForManualDataSuspenseQuery>;
export type GetDataLoggerByTimeStampForManualDataQueryResult = Apollo.QueryResult<GetDataLoggerByTimeStampForManualDataQuery, GetDataLoggerByTimeStampForManualDataQueryVariables>;
export function refetchGetDataLoggerByTimeStampForManualDataQuery(variables?: GetDataLoggerByTimeStampForManualDataQueryVariables) {
      return { query: GetDataLoggerByTimeStampForManualDataDocument, variables: variables }
    }
export const GetDataLoggerOfSiteCurrentTimeDocument = gql`
    query GetDataLoggerOfSiteCurrentTime($loggerid: String) {
  GetDataLoggerOfSiteCurrentTime(loggerid: $loggerid) {
    BaseMax
    BaseMin
    ChannelId
    ChannelName
    ListDataLogger {
      TimeStamp
      Value
      _id
    }
    Unit
  }
}
    `;

/**
 * __useGetDataLoggerOfSiteCurrentTimeQuery__
 *
 * To run a query within a React component, call `useGetDataLoggerOfSiteCurrentTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataLoggerOfSiteCurrentTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataLoggerOfSiteCurrentTimeQuery({
 *   variables: {
 *      loggerid: // value for 'loggerid'
 *   },
 * });
 */
export function useGetDataLoggerOfSiteCurrentTimeQuery(baseOptions?: Apollo.QueryHookOptions<GetDataLoggerOfSiteCurrentTimeQuery, GetDataLoggerOfSiteCurrentTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataLoggerOfSiteCurrentTimeQuery, GetDataLoggerOfSiteCurrentTimeQueryVariables>(GetDataLoggerOfSiteCurrentTimeDocument, options);
      }
export function useGetDataLoggerOfSiteCurrentTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataLoggerOfSiteCurrentTimeQuery, GetDataLoggerOfSiteCurrentTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataLoggerOfSiteCurrentTimeQuery, GetDataLoggerOfSiteCurrentTimeQueryVariables>(GetDataLoggerOfSiteCurrentTimeDocument, options);
        }
export function useGetDataLoggerOfSiteCurrentTimeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataLoggerOfSiteCurrentTimeQuery, GetDataLoggerOfSiteCurrentTimeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataLoggerOfSiteCurrentTimeQuery, GetDataLoggerOfSiteCurrentTimeQueryVariables>(GetDataLoggerOfSiteCurrentTimeDocument, options);
        }
export type GetDataLoggerOfSiteCurrentTimeQueryHookResult = ReturnType<typeof useGetDataLoggerOfSiteCurrentTimeQuery>;
export type GetDataLoggerOfSiteCurrentTimeLazyQueryHookResult = ReturnType<typeof useGetDataLoggerOfSiteCurrentTimeLazyQuery>;
export type GetDataLoggerOfSiteCurrentTimeSuspenseQueryHookResult = ReturnType<typeof useGetDataLoggerOfSiteCurrentTimeSuspenseQuery>;
export type GetDataLoggerOfSiteCurrentTimeQueryResult = Apollo.QueryResult<GetDataLoggerOfSiteCurrentTimeQuery, GetDataLoggerOfSiteCurrentTimeQueryVariables>;
export function refetchGetDataLoggerOfSiteCurrentTimeQuery(variables?: GetDataLoggerOfSiteCurrentTimeQueryVariables) {
      return { query: GetDataLoggerOfSiteCurrentTimeDocument, variables: variables }
    }
export const GetDataLoggerOfSiteByTimeStampDocument = gql`
    query GetDataLoggerOfSiteByTimeStamp($loggerid: String, $start: String, $end: String) {
  GetDataLoggerOfSiteByTimeStamp(loggerid: $loggerid, start: $start, end: $end) {
    BaseMax
    BaseMin
    ChannelId
    ChannelName
    ListDataLogger {
      TimeStamp
      Value
      _id
    }
    Unit
  }
}
    `;

/**
 * __useGetDataLoggerOfSiteByTimeStampQuery__
 *
 * To run a query within a React component, call `useGetDataLoggerOfSiteByTimeStampQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataLoggerOfSiteByTimeStampQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataLoggerOfSiteByTimeStampQuery({
 *   variables: {
 *      loggerid: // value for 'loggerid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetDataLoggerOfSiteByTimeStampQuery(baseOptions?: Apollo.QueryHookOptions<GetDataLoggerOfSiteByTimeStampQuery, GetDataLoggerOfSiteByTimeStampQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataLoggerOfSiteByTimeStampQuery, GetDataLoggerOfSiteByTimeStampQueryVariables>(GetDataLoggerOfSiteByTimeStampDocument, options);
      }
export function useGetDataLoggerOfSiteByTimeStampLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataLoggerOfSiteByTimeStampQuery, GetDataLoggerOfSiteByTimeStampQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataLoggerOfSiteByTimeStampQuery, GetDataLoggerOfSiteByTimeStampQueryVariables>(GetDataLoggerOfSiteByTimeStampDocument, options);
        }
export function useGetDataLoggerOfSiteByTimeStampSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataLoggerOfSiteByTimeStampQuery, GetDataLoggerOfSiteByTimeStampQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataLoggerOfSiteByTimeStampQuery, GetDataLoggerOfSiteByTimeStampQueryVariables>(GetDataLoggerOfSiteByTimeStampDocument, options);
        }
export type GetDataLoggerOfSiteByTimeStampQueryHookResult = ReturnType<typeof useGetDataLoggerOfSiteByTimeStampQuery>;
export type GetDataLoggerOfSiteByTimeStampLazyQueryHookResult = ReturnType<typeof useGetDataLoggerOfSiteByTimeStampLazyQuery>;
export type GetDataLoggerOfSiteByTimeStampSuspenseQueryHookResult = ReturnType<typeof useGetDataLoggerOfSiteByTimeStampSuspenseQuery>;
export type GetDataLoggerOfSiteByTimeStampQueryResult = Apollo.QueryResult<GetDataLoggerOfSiteByTimeStampQuery, GetDataLoggerOfSiteByTimeStampQueryVariables>;
export function refetchGetDataLoggerOfSiteByTimeStampQuery(variables?: GetDataLoggerOfSiteByTimeStampQueryVariables) {
      return { query: GetDataLoggerOfSiteByTimeStampDocument, variables: variables }
    }
export const GetDataLoggerPressureByLoggerIdDocument = gql`
    query GetDataLoggerPressureByLoggerId($loggerid: String, $start: String, $end: String) {
  GetDataLoggerPressureByLoggerId(loggerid: $loggerid, start: $start, end: $end) {
    TimeStamp
    Value
    _id
  }
}
    `;

/**
 * __useGetDataLoggerPressureByLoggerIdQuery__
 *
 * To run a query within a React component, call `useGetDataLoggerPressureByLoggerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataLoggerPressureByLoggerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataLoggerPressureByLoggerIdQuery({
 *   variables: {
 *      loggerid: // value for 'loggerid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetDataLoggerPressureByLoggerIdQuery(baseOptions?: Apollo.QueryHookOptions<GetDataLoggerPressureByLoggerIdQuery, GetDataLoggerPressureByLoggerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataLoggerPressureByLoggerIdQuery, GetDataLoggerPressureByLoggerIdQueryVariables>(GetDataLoggerPressureByLoggerIdDocument, options);
      }
export function useGetDataLoggerPressureByLoggerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataLoggerPressureByLoggerIdQuery, GetDataLoggerPressureByLoggerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataLoggerPressureByLoggerIdQuery, GetDataLoggerPressureByLoggerIdQueryVariables>(GetDataLoggerPressureByLoggerIdDocument, options);
        }
export function useGetDataLoggerPressureByLoggerIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataLoggerPressureByLoggerIdQuery, GetDataLoggerPressureByLoggerIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataLoggerPressureByLoggerIdQuery, GetDataLoggerPressureByLoggerIdQueryVariables>(GetDataLoggerPressureByLoggerIdDocument, options);
        }
export type GetDataLoggerPressureByLoggerIdQueryHookResult = ReturnType<typeof useGetDataLoggerPressureByLoggerIdQuery>;
export type GetDataLoggerPressureByLoggerIdLazyQueryHookResult = ReturnType<typeof useGetDataLoggerPressureByLoggerIdLazyQuery>;
export type GetDataLoggerPressureByLoggerIdSuspenseQueryHookResult = ReturnType<typeof useGetDataLoggerPressureByLoggerIdSuspenseQuery>;
export type GetDataLoggerPressureByLoggerIdQueryResult = Apollo.QueryResult<GetDataLoggerPressureByLoggerIdQuery, GetDataLoggerPressureByLoggerIdQueryVariables>;
export function refetchGetDataLoggerPressureByLoggerIdQuery(variables?: GetDataLoggerPressureByLoggerIdQueryVariables) {
      return { query: GetDataLoggerPressureByLoggerIdDocument, variables: variables }
    }
export const InsertDataLoggerDocument = gql`
    mutation InsertDataLogger($data: DataLoggerInsertInput) {
  InsertDataLogger(data: $data)
}
    `;
export type InsertDataLoggerMutationFn = Apollo.MutationFunction<InsertDataLoggerMutation, InsertDataLoggerMutationVariables>;

/**
 * __useInsertDataLoggerMutation__
 *
 * To run a mutation, you first call `useInsertDataLoggerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertDataLoggerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertDataLoggerMutation, { data, loading, error }] = useInsertDataLoggerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertDataLoggerMutation(baseOptions?: Apollo.MutationHookOptions<InsertDataLoggerMutation, InsertDataLoggerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertDataLoggerMutation, InsertDataLoggerMutationVariables>(InsertDataLoggerDocument, options);
      }
export type InsertDataLoggerMutationHookResult = ReturnType<typeof useInsertDataLoggerMutation>;
export type InsertDataLoggerMutationResult = Apollo.MutationResult<InsertDataLoggerMutation>;
export type InsertDataLoggerMutationOptions = Apollo.BaseMutationOptions<InsertDataLoggerMutation, InsertDataLoggerMutationVariables>;
export const UpdateDataLoggerDocument = gql`
    mutation UpdateDataLogger($data: DataLoggerUpdateInput) {
  UpdateDataLogger(data: $data)
}
    `;
export type UpdateDataLoggerMutationFn = Apollo.MutationFunction<UpdateDataLoggerMutation, UpdateDataLoggerMutationVariables>;

/**
 * __useUpdateDataLoggerMutation__
 *
 * To run a mutation, you first call `useUpdateDataLoggerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDataLoggerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDataLoggerMutation, { data, loading, error }] = useUpdateDataLoggerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDataLoggerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDataLoggerMutation, UpdateDataLoggerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDataLoggerMutation, UpdateDataLoggerMutationVariables>(UpdateDataLoggerDocument, options);
      }
export type UpdateDataLoggerMutationHookResult = ReturnType<typeof useUpdateDataLoggerMutation>;
export type UpdateDataLoggerMutationResult = Apollo.MutationResult<UpdateDataLoggerMutation>;
export type UpdateDataLoggerMutationOptions = Apollo.BaseMutationOptions<UpdateDataLoggerMutation, UpdateDataLoggerMutationVariables>;
export const DeleteDataLoggerDocument = gql`
    mutation DeleteDataLogger($data: DataLoggerUpdateInput) {
  DeleteDataLogger(data: $data)
}
    `;
export type DeleteDataLoggerMutationFn = Apollo.MutationFunction<DeleteDataLoggerMutation, DeleteDataLoggerMutationVariables>;

/**
 * __useDeleteDataLoggerMutation__
 *
 * To run a mutation, you first call `useDeleteDataLoggerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDataLoggerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDataLoggerMutation, { data, loading, error }] = useDeleteDataLoggerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteDataLoggerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDataLoggerMutation, DeleteDataLoggerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDataLoggerMutation, DeleteDataLoggerMutationVariables>(DeleteDataLoggerDocument, options);
      }
export type DeleteDataLoggerMutationHookResult = ReturnType<typeof useDeleteDataLoggerMutation>;
export type DeleteDataLoggerMutationResult = Apollo.MutationResult<DeleteDataLoggerMutation>;
export type DeleteDataLoggerMutationOptions = Apollo.BaseMutationOptions<DeleteDataLoggerMutation, DeleteDataLoggerMutationVariables>;
export const GetDataManualsDocument = gql`
    query GetDataManuals {
  GetDataManuals {
    SiteId
    TimeStamp
    Value
    _id
  }
}
    `;

/**
 * __useGetDataManualsQuery__
 *
 * To run a query within a React component, call `useGetDataManualsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataManualsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataManualsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataManualsQuery(baseOptions?: Apollo.QueryHookOptions<GetDataManualsQuery, GetDataManualsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataManualsQuery, GetDataManualsQueryVariables>(GetDataManualsDocument, options);
      }
export function useGetDataManualsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataManualsQuery, GetDataManualsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataManualsQuery, GetDataManualsQueryVariables>(GetDataManualsDocument, options);
        }
export function useGetDataManualsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataManualsQuery, GetDataManualsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataManualsQuery, GetDataManualsQueryVariables>(GetDataManualsDocument, options);
        }
export type GetDataManualsQueryHookResult = ReturnType<typeof useGetDataManualsQuery>;
export type GetDataManualsLazyQueryHookResult = ReturnType<typeof useGetDataManualsLazyQuery>;
export type GetDataManualsSuspenseQueryHookResult = ReturnType<typeof useGetDataManualsSuspenseQuery>;
export type GetDataManualsQueryResult = Apollo.QueryResult<GetDataManualsQuery, GetDataManualsQueryVariables>;
export function refetchGetDataManualsQuery(variables?: GetDataManualsQueryVariables) {
      return { query: GetDataManualsDocument, variables: variables }
    }
export const GetDataManualBySiteIdDocument = gql`
    query GetDataManualBySiteId($siteid: String) {
  GetDataManualBySiteId(siteid: $siteid) {
    SiteId
    TimeStamp
    Value
    _id
  }
}
    `;

/**
 * __useGetDataManualBySiteIdQuery__
 *
 * To run a query within a React component, call `useGetDataManualBySiteIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataManualBySiteIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataManualBySiteIdQuery({
 *   variables: {
 *      siteid: // value for 'siteid'
 *   },
 * });
 */
export function useGetDataManualBySiteIdQuery(baseOptions?: Apollo.QueryHookOptions<GetDataManualBySiteIdQuery, GetDataManualBySiteIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataManualBySiteIdQuery, GetDataManualBySiteIdQueryVariables>(GetDataManualBySiteIdDocument, options);
      }
export function useGetDataManualBySiteIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataManualBySiteIdQuery, GetDataManualBySiteIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataManualBySiteIdQuery, GetDataManualBySiteIdQueryVariables>(GetDataManualBySiteIdDocument, options);
        }
export function useGetDataManualBySiteIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataManualBySiteIdQuery, GetDataManualBySiteIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataManualBySiteIdQuery, GetDataManualBySiteIdQueryVariables>(GetDataManualBySiteIdDocument, options);
        }
export type GetDataManualBySiteIdQueryHookResult = ReturnType<typeof useGetDataManualBySiteIdQuery>;
export type GetDataManualBySiteIdLazyQueryHookResult = ReturnType<typeof useGetDataManualBySiteIdLazyQuery>;
export type GetDataManualBySiteIdSuspenseQueryHookResult = ReturnType<typeof useGetDataManualBySiteIdSuspenseQuery>;
export type GetDataManualBySiteIdQueryResult = Apollo.QueryResult<GetDataManualBySiteIdQuery, GetDataManualBySiteIdQueryVariables>;
export function refetchGetDataManualBySiteIdQuery(variables?: GetDataManualBySiteIdQueryVariables) {
      return { query: GetDataManualBySiteIdDocument, variables: variables }
    }
export const InsertDataManualDocument = gql`
    mutation InsertDataManual($data: DataManualInsertInput) {
  InsertDataManual(data: $data)
}
    `;
export type InsertDataManualMutationFn = Apollo.MutationFunction<InsertDataManualMutation, InsertDataManualMutationVariables>;

/**
 * __useInsertDataManualMutation__
 *
 * To run a mutation, you first call `useInsertDataManualMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertDataManualMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertDataManualMutation, { data, loading, error }] = useInsertDataManualMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertDataManualMutation(baseOptions?: Apollo.MutationHookOptions<InsertDataManualMutation, InsertDataManualMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertDataManualMutation, InsertDataManualMutationVariables>(InsertDataManualDocument, options);
      }
export type InsertDataManualMutationHookResult = ReturnType<typeof useInsertDataManualMutation>;
export type InsertDataManualMutationResult = Apollo.MutationResult<InsertDataManualMutation>;
export type InsertDataManualMutationOptions = Apollo.BaseMutationOptions<InsertDataManualMutation, InsertDataManualMutationVariables>;
export const UpdateDataManualDocument = gql`
    mutation UpdateDataManual($data: DataManualUpdateInput) {
  UpdateDataManual(data: $data)
}
    `;
export type UpdateDataManualMutationFn = Apollo.MutationFunction<UpdateDataManualMutation, UpdateDataManualMutationVariables>;

/**
 * __useUpdateDataManualMutation__
 *
 * To run a mutation, you first call `useUpdateDataManualMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDataManualMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDataManualMutation, { data, loading, error }] = useUpdateDataManualMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDataManualMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDataManualMutation, UpdateDataManualMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDataManualMutation, UpdateDataManualMutationVariables>(UpdateDataManualDocument, options);
      }
export type UpdateDataManualMutationHookResult = ReturnType<typeof useUpdateDataManualMutation>;
export type UpdateDataManualMutationResult = Apollo.MutationResult<UpdateDataManualMutation>;
export type UpdateDataManualMutationOptions = Apollo.BaseMutationOptions<UpdateDataManualMutation, UpdateDataManualMutationVariables>;
export const DeleteDataManualDocument = gql`
    mutation DeleteDataManual($data: DataManualUpdateInput) {
  DeleteDataManual(data: $data)
}
    `;
export type DeleteDataManualMutationFn = Apollo.MutationFunction<DeleteDataManualMutation, DeleteDataManualMutationVariables>;

/**
 * __useDeleteDataManualMutation__
 *
 * To run a mutation, you first call `useDeleteDataManualMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDataManualMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDataManualMutation, { data, loading, error }] = useDeleteDataManualMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteDataManualMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDataManualMutation, DeleteDataManualMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDataManualMutation, DeleteDataManualMutationVariables>(DeleteDataManualDocument, options);
      }
export type DeleteDataManualMutationHookResult = ReturnType<typeof useDeleteDataManualMutation>;
export type DeleteDataManualMutationResult = Apollo.MutationResult<DeleteDataManualMutation>;
export type DeleteDataManualMutationOptions = Apollo.BaseMutationOptions<DeleteDataManualMutation, DeleteDataManualMutationVariables>;
export const GetDataTableCurrentDocument = gql`
    query GetDataTableCurrent {
  GetDataTableCurrent {
    ForwardFlow
    IndexForwardFlow
    Location
    IndexReverseFlow
    Pressure
    ReverseFlow
    STT
    SiteId
    TimeStamp
    Type
  }
}
    `;

/**
 * __useGetDataTableCurrentQuery__
 *
 * To run a query within a React component, call `useGetDataTableCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataTableCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataTableCurrentQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataTableCurrentQuery(baseOptions?: Apollo.QueryHookOptions<GetDataTableCurrentQuery, GetDataTableCurrentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataTableCurrentQuery, GetDataTableCurrentQueryVariables>(GetDataTableCurrentDocument, options);
      }
export function useGetDataTableCurrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataTableCurrentQuery, GetDataTableCurrentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataTableCurrentQuery, GetDataTableCurrentQueryVariables>(GetDataTableCurrentDocument, options);
        }
export function useGetDataTableCurrentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataTableCurrentQuery, GetDataTableCurrentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataTableCurrentQuery, GetDataTableCurrentQueryVariables>(GetDataTableCurrentDocument, options);
        }
export type GetDataTableCurrentQueryHookResult = ReturnType<typeof useGetDataTableCurrentQuery>;
export type GetDataTableCurrentLazyQueryHookResult = ReturnType<typeof useGetDataTableCurrentLazyQuery>;
export type GetDataTableCurrentSuspenseQueryHookResult = ReturnType<typeof useGetDataTableCurrentSuspenseQuery>;
export type GetDataTableCurrentQueryResult = Apollo.QueryResult<GetDataTableCurrentQuery, GetDataTableCurrentQueryVariables>;
export function refetchGetDataTableCurrentQuery(variables?: GetDataTableCurrentQueryVariables) {
      return { query: GetDataTableCurrentDocument, variables: variables }
    }
export const GetDisplayGroupsDocument = gql`
    query GetDisplayGroups {
  GetDisplayGroups {
    Group
    Name
    _id
  }
}
    `;

/**
 * __useGetDisplayGroupsQuery__
 *
 * To run a query within a React component, call `useGetDisplayGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDisplayGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDisplayGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDisplayGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetDisplayGroupsQuery, GetDisplayGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDisplayGroupsQuery, GetDisplayGroupsQueryVariables>(GetDisplayGroupsDocument, options);
      }
export function useGetDisplayGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDisplayGroupsQuery, GetDisplayGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDisplayGroupsQuery, GetDisplayGroupsQueryVariables>(GetDisplayGroupsDocument, options);
        }
export function useGetDisplayGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDisplayGroupsQuery, GetDisplayGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDisplayGroupsQuery, GetDisplayGroupsQueryVariables>(GetDisplayGroupsDocument, options);
        }
export type GetDisplayGroupsQueryHookResult = ReturnType<typeof useGetDisplayGroupsQuery>;
export type GetDisplayGroupsLazyQueryHookResult = ReturnType<typeof useGetDisplayGroupsLazyQuery>;
export type GetDisplayGroupsSuspenseQueryHookResult = ReturnType<typeof useGetDisplayGroupsSuspenseQuery>;
export type GetDisplayGroupsQueryResult = Apollo.QueryResult<GetDisplayGroupsQuery, GetDisplayGroupsQueryVariables>;
export function refetchGetDisplayGroupsQuery(variables?: GetDisplayGroupsQueryVariables) {
      return { query: GetDisplayGroupsDocument, variables: variables }
    }
export const InsertDisplayGroupDocument = gql`
    mutation InsertDisplayGroup($displayGroup: DisplayGroupInsertInput) {
  InsertDisplayGroup(displayGroup: $displayGroup)
}
    `;
export type InsertDisplayGroupMutationFn = Apollo.MutationFunction<InsertDisplayGroupMutation, InsertDisplayGroupMutationVariables>;

/**
 * __useInsertDisplayGroupMutation__
 *
 * To run a mutation, you first call `useInsertDisplayGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertDisplayGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertDisplayGroupMutation, { data, loading, error }] = useInsertDisplayGroupMutation({
 *   variables: {
 *      displayGroup: // value for 'displayGroup'
 *   },
 * });
 */
export function useInsertDisplayGroupMutation(baseOptions?: Apollo.MutationHookOptions<InsertDisplayGroupMutation, InsertDisplayGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertDisplayGroupMutation, InsertDisplayGroupMutationVariables>(InsertDisplayGroupDocument, options);
      }
export type InsertDisplayGroupMutationHookResult = ReturnType<typeof useInsertDisplayGroupMutation>;
export type InsertDisplayGroupMutationResult = Apollo.MutationResult<InsertDisplayGroupMutation>;
export type InsertDisplayGroupMutationOptions = Apollo.BaseMutationOptions<InsertDisplayGroupMutation, InsertDisplayGroupMutationVariables>;
export const UpdateDisplayGroupDocument = gql`
    mutation UpdateDisplayGroup($displayGroup: DisplayGroupUpdateInput) {
  UpdateDisplayGroup(displayGroup: $displayGroup)
}
    `;
export type UpdateDisplayGroupMutationFn = Apollo.MutationFunction<UpdateDisplayGroupMutation, UpdateDisplayGroupMutationVariables>;

/**
 * __useUpdateDisplayGroupMutation__
 *
 * To run a mutation, you first call `useUpdateDisplayGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDisplayGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDisplayGroupMutation, { data, loading, error }] = useUpdateDisplayGroupMutation({
 *   variables: {
 *      displayGroup: // value for 'displayGroup'
 *   },
 * });
 */
export function useUpdateDisplayGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDisplayGroupMutation, UpdateDisplayGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDisplayGroupMutation, UpdateDisplayGroupMutationVariables>(UpdateDisplayGroupDocument, options);
      }
export type UpdateDisplayGroupMutationHookResult = ReturnType<typeof useUpdateDisplayGroupMutation>;
export type UpdateDisplayGroupMutationResult = Apollo.MutationResult<UpdateDisplayGroupMutation>;
export type UpdateDisplayGroupMutationOptions = Apollo.BaseMutationOptions<UpdateDisplayGroupMutation, UpdateDisplayGroupMutationVariables>;
export const DeleteDisplayGroupDocument = gql`
    mutation DeleteDisplayGroup($displayGroup: DisplayGroupUpdateInput) {
  DeleteDisplayGroup(displayGroup: $displayGroup)
}
    `;
export type DeleteDisplayGroupMutationFn = Apollo.MutationFunction<DeleteDisplayGroupMutation, DeleteDisplayGroupMutationVariables>;

/**
 * __useDeleteDisplayGroupMutation__
 *
 * To run a mutation, you first call `useDeleteDisplayGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDisplayGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDisplayGroupMutation, { data, loading, error }] = useDeleteDisplayGroupMutation({
 *   variables: {
 *      displayGroup: // value for 'displayGroup'
 *   },
 * });
 */
export function useDeleteDisplayGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDisplayGroupMutation, DeleteDisplayGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDisplayGroupMutation, DeleteDisplayGroupMutationVariables>(DeleteDisplayGroupDocument, options);
      }
export type DeleteDisplayGroupMutationHookResult = ReturnType<typeof useDeleteDisplayGroupMutation>;
export type DeleteDisplayGroupMutationResult = Apollo.MutationResult<DeleteDisplayGroupMutation>;
export type DeleteDisplayGroupMutationOptions = Apollo.BaseMutationOptions<DeleteDisplayGroupMutation, DeleteDisplayGroupMutationVariables>;
export const GetDataDrawingPipeDocument = gql`
    query GetDataDrawingPipe {
  GetDataDrawingPipe {
    GroupPipeId
    GroupPipeName
    Pipes {
      BaseMax
      BaseMin
      Length
      Lines {
        Color
        Lines
      }
      PipeId
      PipeName
      Size
      TypeAlarmChannel
    }
  }
}
    `;

/**
 * __useGetDataDrawingPipeQuery__
 *
 * To run a query within a React component, call `useGetDataDrawingPipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataDrawingPipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataDrawingPipeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataDrawingPipeQuery(baseOptions?: Apollo.QueryHookOptions<GetDataDrawingPipeQuery, GetDataDrawingPipeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataDrawingPipeQuery, GetDataDrawingPipeQueryVariables>(GetDataDrawingPipeDocument, options);
      }
export function useGetDataDrawingPipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataDrawingPipeQuery, GetDataDrawingPipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataDrawingPipeQuery, GetDataDrawingPipeQueryVariables>(GetDataDrawingPipeDocument, options);
        }
export function useGetDataDrawingPipeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataDrawingPipeQuery, GetDataDrawingPipeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataDrawingPipeQuery, GetDataDrawingPipeQueryVariables>(GetDataDrawingPipeDocument, options);
        }
export type GetDataDrawingPipeQueryHookResult = ReturnType<typeof useGetDataDrawingPipeQuery>;
export type GetDataDrawingPipeLazyQueryHookResult = ReturnType<typeof useGetDataDrawingPipeLazyQuery>;
export type GetDataDrawingPipeSuspenseQueryHookResult = ReturnType<typeof useGetDataDrawingPipeSuspenseQuery>;
export type GetDataDrawingPipeQueryResult = Apollo.QueryResult<GetDataDrawingPipeQuery, GetDataDrawingPipeQueryVariables>;
export function refetchGetDataDrawingPipeQuery(variables?: GetDataDrawingPipeQueryVariables) {
      return { query: GetDataDrawingPipeDocument, variables: variables }
    }
export const GetGroupPipesDocument = gql`
    query GetGroupPipes {
  GetGroupPipes {
    Description
    GroupPipeId
    Name
    Color
    _id
    SiteIdStart
    SiteIdEnd
  }
}
    `;

/**
 * __useGetGroupPipesQuery__
 *
 * To run a query within a React component, call `useGetGroupPipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupPipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupPipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGroupPipesQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupPipesQuery, GetGroupPipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupPipesQuery, GetGroupPipesQueryVariables>(GetGroupPipesDocument, options);
      }
export function useGetGroupPipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupPipesQuery, GetGroupPipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupPipesQuery, GetGroupPipesQueryVariables>(GetGroupPipesDocument, options);
        }
export function useGetGroupPipesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGroupPipesQuery, GetGroupPipesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGroupPipesQuery, GetGroupPipesQueryVariables>(GetGroupPipesDocument, options);
        }
export type GetGroupPipesQueryHookResult = ReturnType<typeof useGetGroupPipesQuery>;
export type GetGroupPipesLazyQueryHookResult = ReturnType<typeof useGetGroupPipesLazyQuery>;
export type GetGroupPipesSuspenseQueryHookResult = ReturnType<typeof useGetGroupPipesSuspenseQuery>;
export type GetGroupPipesQueryResult = Apollo.QueryResult<GetGroupPipesQuery, GetGroupPipesQueryVariables>;
export function refetchGetGroupPipesQuery(variables?: GetGroupPipesQueryVariables) {
      return { query: GetGroupPipesDocument, variables: variables }
    }
export const InsertGroupPipeDocument = gql`
    mutation InsertGroupPipe($groupPipe: GroupPipeInsertInput) {
  InsertGroupPipe(groupPipe: $groupPipe)
}
    `;
export type InsertGroupPipeMutationFn = Apollo.MutationFunction<InsertGroupPipeMutation, InsertGroupPipeMutationVariables>;

/**
 * __useInsertGroupPipeMutation__
 *
 * To run a mutation, you first call `useInsertGroupPipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertGroupPipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertGroupPipeMutation, { data, loading, error }] = useInsertGroupPipeMutation({
 *   variables: {
 *      groupPipe: // value for 'groupPipe'
 *   },
 * });
 */
export function useInsertGroupPipeMutation(baseOptions?: Apollo.MutationHookOptions<InsertGroupPipeMutation, InsertGroupPipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertGroupPipeMutation, InsertGroupPipeMutationVariables>(InsertGroupPipeDocument, options);
      }
export type InsertGroupPipeMutationHookResult = ReturnType<typeof useInsertGroupPipeMutation>;
export type InsertGroupPipeMutationResult = Apollo.MutationResult<InsertGroupPipeMutation>;
export type InsertGroupPipeMutationOptions = Apollo.BaseMutationOptions<InsertGroupPipeMutation, InsertGroupPipeMutationVariables>;
export const UpdateGroupPipeDocument = gql`
    mutation UpdateGroupPipe($groupPipe: GroupPipeUpdateInput) {
  UpdateGroupPipe(groupPipe: $groupPipe)
}
    `;
export type UpdateGroupPipeMutationFn = Apollo.MutationFunction<UpdateGroupPipeMutation, UpdateGroupPipeMutationVariables>;

/**
 * __useUpdateGroupPipeMutation__
 *
 * To run a mutation, you first call `useUpdateGroupPipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupPipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupPipeMutation, { data, loading, error }] = useUpdateGroupPipeMutation({
 *   variables: {
 *      groupPipe: // value for 'groupPipe'
 *   },
 * });
 */
export function useUpdateGroupPipeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupPipeMutation, UpdateGroupPipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupPipeMutation, UpdateGroupPipeMutationVariables>(UpdateGroupPipeDocument, options);
      }
export type UpdateGroupPipeMutationHookResult = ReturnType<typeof useUpdateGroupPipeMutation>;
export type UpdateGroupPipeMutationResult = Apollo.MutationResult<UpdateGroupPipeMutation>;
export type UpdateGroupPipeMutationOptions = Apollo.BaseMutationOptions<UpdateGroupPipeMutation, UpdateGroupPipeMutationVariables>;
export const DeleteGroupPipeDocument = gql`
    mutation DeleteGroupPipe($groupPipe: GroupPipeUpdateInput) {
  DeleteGroupPipe(groupPipe: $groupPipe)
}
    `;
export type DeleteGroupPipeMutationFn = Apollo.MutationFunction<DeleteGroupPipeMutation, DeleteGroupPipeMutationVariables>;

/**
 * __useDeleteGroupPipeMutation__
 *
 * To run a mutation, you first call `useDeleteGroupPipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupPipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupPipeMutation, { data, loading, error }] = useDeleteGroupPipeMutation({
 *   variables: {
 *      groupPipe: // value for 'groupPipe'
 *   },
 * });
 */
export function useDeleteGroupPipeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupPipeMutation, DeleteGroupPipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupPipeMutation, DeleteGroupPipeMutationVariables>(DeleteGroupPipeDocument, options);
      }
export type DeleteGroupPipeMutationHookResult = ReturnType<typeof useDeleteGroupPipeMutation>;
export type DeleteGroupPipeMutationResult = Apollo.MutationResult<DeleteGroupPipeMutation>;
export type DeleteGroupPipeMutationOptions = Apollo.BaseMutationOptions<DeleteGroupPipeMutation, DeleteGroupPipeMutationVariables>;
export const GetIndexLoggerExactTimeDocument = gql`
    query GetIndexLoggerExactTime($time: String, $channelid: String) {
  GetIndexLoggerExactTime(time: $time, channelid: $channelid) {
    TimeStamp
    Value
    _id
  }
}
    `;

/**
 * __useGetIndexLoggerExactTimeQuery__
 *
 * To run a query within a React component, call `useGetIndexLoggerExactTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIndexLoggerExactTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIndexLoggerExactTimeQuery({
 *   variables: {
 *      time: // value for 'time'
 *      channelid: // value for 'channelid'
 *   },
 * });
 */
export function useGetIndexLoggerExactTimeQuery(baseOptions?: Apollo.QueryHookOptions<GetIndexLoggerExactTimeQuery, GetIndexLoggerExactTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIndexLoggerExactTimeQuery, GetIndexLoggerExactTimeQueryVariables>(GetIndexLoggerExactTimeDocument, options);
      }
export function useGetIndexLoggerExactTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIndexLoggerExactTimeQuery, GetIndexLoggerExactTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIndexLoggerExactTimeQuery, GetIndexLoggerExactTimeQueryVariables>(GetIndexLoggerExactTimeDocument, options);
        }
export function useGetIndexLoggerExactTimeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIndexLoggerExactTimeQuery, GetIndexLoggerExactTimeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIndexLoggerExactTimeQuery, GetIndexLoggerExactTimeQueryVariables>(GetIndexLoggerExactTimeDocument, options);
        }
export type GetIndexLoggerExactTimeQueryHookResult = ReturnType<typeof useGetIndexLoggerExactTimeQuery>;
export type GetIndexLoggerExactTimeLazyQueryHookResult = ReturnType<typeof useGetIndexLoggerExactTimeLazyQuery>;
export type GetIndexLoggerExactTimeSuspenseQueryHookResult = ReturnType<typeof useGetIndexLoggerExactTimeSuspenseQuery>;
export type GetIndexLoggerExactTimeQueryResult = Apollo.QueryResult<GetIndexLoggerExactTimeQuery, GetIndexLoggerExactTimeQueryVariables>;
export function refetchGetIndexLoggerExactTimeQuery(variables?: GetIndexLoggerExactTimeQueryVariables) {
      return { query: GetIndexLoggerExactTimeDocument, variables: variables }
    }
export const GetIndexLoggerFilterTimeDocument = gql`
    query GetIndexLoggerFilterTime($start: String, $channelid: String, $end: String) {
  GetIndexLoggerFilterTime(start: $start, channelid: $channelid, end: $end) {
    TimeStamp
    Value
    _id
  }
}
    `;

/**
 * __useGetIndexLoggerFilterTimeQuery__
 *
 * To run a query within a React component, call `useGetIndexLoggerFilterTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIndexLoggerFilterTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIndexLoggerFilterTimeQuery({
 *   variables: {
 *      start: // value for 'start'
 *      channelid: // value for 'channelid'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetIndexLoggerFilterTimeQuery(baseOptions?: Apollo.QueryHookOptions<GetIndexLoggerFilterTimeQuery, GetIndexLoggerFilterTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIndexLoggerFilterTimeQuery, GetIndexLoggerFilterTimeQueryVariables>(GetIndexLoggerFilterTimeDocument, options);
      }
export function useGetIndexLoggerFilterTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIndexLoggerFilterTimeQuery, GetIndexLoggerFilterTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIndexLoggerFilterTimeQuery, GetIndexLoggerFilterTimeQueryVariables>(GetIndexLoggerFilterTimeDocument, options);
        }
export function useGetIndexLoggerFilterTimeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIndexLoggerFilterTimeQuery, GetIndexLoggerFilterTimeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIndexLoggerFilterTimeQuery, GetIndexLoggerFilterTimeQueryVariables>(GetIndexLoggerFilterTimeDocument, options);
        }
export type GetIndexLoggerFilterTimeQueryHookResult = ReturnType<typeof useGetIndexLoggerFilterTimeQuery>;
export type GetIndexLoggerFilterTimeLazyQueryHookResult = ReturnType<typeof useGetIndexLoggerFilterTimeLazyQuery>;
export type GetIndexLoggerFilterTimeSuspenseQueryHookResult = ReturnType<typeof useGetIndexLoggerFilterTimeSuspenseQuery>;
export type GetIndexLoggerFilterTimeQueryResult = Apollo.QueryResult<GetIndexLoggerFilterTimeQuery, GetIndexLoggerFilterTimeQueryVariables>;
export function refetchGetIndexLoggerFilterTimeQuery(variables?: GetIndexLoggerFilterTimeQueryVariables) {
      return { query: GetIndexLoggerFilterTimeDocument, variables: variables }
    }
export const GetListPointBranchByBranchIdDocument = gql`
    query GetListPointBranchByBranchId($branchid: String) {
  GetListPointBranchByBranchId(branchid: $branchid) {
    BranchId
    Level
    PointId
    _id
  }
}
    `;

/**
 * __useGetListPointBranchByBranchIdQuery__
 *
 * To run a query within a React component, call `useGetListPointBranchByBranchIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListPointBranchByBranchIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListPointBranchByBranchIdQuery({
 *   variables: {
 *      branchid: // value for 'branchid'
 *   },
 * });
 */
export function useGetListPointBranchByBranchIdQuery(baseOptions?: Apollo.QueryHookOptions<GetListPointBranchByBranchIdQuery, GetListPointBranchByBranchIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListPointBranchByBranchIdQuery, GetListPointBranchByBranchIdQueryVariables>(GetListPointBranchByBranchIdDocument, options);
      }
export function useGetListPointBranchByBranchIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListPointBranchByBranchIdQuery, GetListPointBranchByBranchIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListPointBranchByBranchIdQuery, GetListPointBranchByBranchIdQueryVariables>(GetListPointBranchByBranchIdDocument, options);
        }
export function useGetListPointBranchByBranchIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetListPointBranchByBranchIdQuery, GetListPointBranchByBranchIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListPointBranchByBranchIdQuery, GetListPointBranchByBranchIdQueryVariables>(GetListPointBranchByBranchIdDocument, options);
        }
export type GetListPointBranchByBranchIdQueryHookResult = ReturnType<typeof useGetListPointBranchByBranchIdQuery>;
export type GetListPointBranchByBranchIdLazyQueryHookResult = ReturnType<typeof useGetListPointBranchByBranchIdLazyQuery>;
export type GetListPointBranchByBranchIdSuspenseQueryHookResult = ReturnType<typeof useGetListPointBranchByBranchIdSuspenseQuery>;
export type GetListPointBranchByBranchIdQueryResult = Apollo.QueryResult<GetListPointBranchByBranchIdQuery, GetListPointBranchByBranchIdQueryVariables>;
export function refetchGetListPointBranchByBranchIdQuery(variables?: GetListPointBranchByBranchIdQueryVariables) {
      return { query: GetListPointBranchByBranchIdDocument, variables: variables }
    }
export const UpdateListPointBranchDocument = gql`
    mutation UpdateListPointBranch($list: ListPointBranchUpdateInput) {
  UpdateListPointBranch(list: $list)
}
    `;
export type UpdateListPointBranchMutationFn = Apollo.MutationFunction<UpdateListPointBranchMutation, UpdateListPointBranchMutationVariables>;

/**
 * __useUpdateListPointBranchMutation__
 *
 * To run a mutation, you first call `useUpdateListPointBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListPointBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListPointBranchMutation, { data, loading, error }] = useUpdateListPointBranchMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useUpdateListPointBranchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListPointBranchMutation, UpdateListPointBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListPointBranchMutation, UpdateListPointBranchMutationVariables>(UpdateListPointBranchDocument, options);
      }
export type UpdateListPointBranchMutationHookResult = ReturnType<typeof useUpdateListPointBranchMutation>;
export type UpdateListPointBranchMutationResult = Apollo.MutationResult<UpdateListPointBranchMutation>;
export type UpdateListPointBranchMutationOptions = Apollo.BaseMutationOptions<UpdateListPointBranchMutation, UpdateListPointBranchMutationVariables>;
export const GetListPointPipeByPipeIdDocument = gql`
    query GetListPointPipeByPipeId($pipeid: String) {
  GetListPointPipeByPipeId(pipeid: $pipeid) {
    PipeId
    PointId
    STT
    _id
  }
}
    `;

/**
 * __useGetListPointPipeByPipeIdQuery__
 *
 * To run a query within a React component, call `useGetListPointPipeByPipeIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListPointPipeByPipeIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListPointPipeByPipeIdQuery({
 *   variables: {
 *      pipeid: // value for 'pipeid'
 *   },
 * });
 */
export function useGetListPointPipeByPipeIdQuery(baseOptions?: Apollo.QueryHookOptions<GetListPointPipeByPipeIdQuery, GetListPointPipeByPipeIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListPointPipeByPipeIdQuery, GetListPointPipeByPipeIdQueryVariables>(GetListPointPipeByPipeIdDocument, options);
      }
export function useGetListPointPipeByPipeIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListPointPipeByPipeIdQuery, GetListPointPipeByPipeIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListPointPipeByPipeIdQuery, GetListPointPipeByPipeIdQueryVariables>(GetListPointPipeByPipeIdDocument, options);
        }
export function useGetListPointPipeByPipeIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetListPointPipeByPipeIdQuery, GetListPointPipeByPipeIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListPointPipeByPipeIdQuery, GetListPointPipeByPipeIdQueryVariables>(GetListPointPipeByPipeIdDocument, options);
        }
export type GetListPointPipeByPipeIdQueryHookResult = ReturnType<typeof useGetListPointPipeByPipeIdQuery>;
export type GetListPointPipeByPipeIdLazyQueryHookResult = ReturnType<typeof useGetListPointPipeByPipeIdLazyQuery>;
export type GetListPointPipeByPipeIdSuspenseQueryHookResult = ReturnType<typeof useGetListPointPipeByPipeIdSuspenseQuery>;
export type GetListPointPipeByPipeIdQueryResult = Apollo.QueryResult<GetListPointPipeByPipeIdQuery, GetListPointPipeByPipeIdQueryVariables>;
export function refetchGetListPointPipeByPipeIdQuery(variables?: GetListPointPipeByPipeIdQueryVariables) {
      return { query: GetListPointPipeByPipeIdDocument, variables: variables }
    }
export const UpdateListPointPipeDocument = gql`
    mutation UpdateListPointPipe($list: ListPointPipeUpdateInput) {
  UpdateListPointPipe(list: $list)
}
    `;
export type UpdateListPointPipeMutationFn = Apollo.MutationFunction<UpdateListPointPipeMutation, UpdateListPointPipeMutationVariables>;

/**
 * __useUpdateListPointPipeMutation__
 *
 * To run a mutation, you first call `useUpdateListPointPipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListPointPipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListPointPipeMutation, { data, loading, error }] = useUpdateListPointPipeMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useUpdateListPointPipeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListPointPipeMutation, UpdateListPointPipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListPointPipeMutation, UpdateListPointPipeMutationVariables>(UpdateListPointPipeDocument, options);
      }
export type UpdateListPointPipeMutationHookResult = ReturnType<typeof useUpdateListPointPipeMutation>;
export type UpdateListPointPipeMutationResult = Apollo.MutationResult<UpdateListPointPipeMutation>;
export type UpdateListPointPipeMutationOptions = Apollo.BaseMutationOptions<UpdateListPointPipeMutation, UpdateListPointPipeMutationVariables>;
export const LoginActionDocument = gql`
    query LoginAction($username: String, $password: String) {
  LoginAction(username: $username, password: $password) {
    Role
    Username
    token
  }
}
    `;

/**
 * __useLoginActionQuery__
 *
 * To run a query within a React component, call `useLoginActionQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginActionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginActionQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginActionQuery(baseOptions?: Apollo.QueryHookOptions<LoginActionQuery, LoginActionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginActionQuery, LoginActionQueryVariables>(LoginActionDocument, options);
      }
export function useLoginActionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginActionQuery, LoginActionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginActionQuery, LoginActionQueryVariables>(LoginActionDocument, options);
        }
export function useLoginActionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginActionQuery, LoginActionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginActionQuery, LoginActionQueryVariables>(LoginActionDocument, options);
        }
export type LoginActionQueryHookResult = ReturnType<typeof useLoginActionQuery>;
export type LoginActionLazyQueryHookResult = ReturnType<typeof useLoginActionLazyQuery>;
export type LoginActionSuspenseQueryHookResult = ReturnType<typeof useLoginActionSuspenseQuery>;
export type LoginActionQueryResult = Apollo.QueryResult<LoginActionQuery, LoginActionQueryVariables>;
export function refetchLoginActionQuery(variables?: LoginActionQueryVariables) {
      return { query: LoginActionDocument, variables: variables }
    }
export const VerifyTokenDocument = gql`
    query VerifyToken($token: String) {
  VerifyToken(token: $token)
}
    `;

/**
 * __useVerifyTokenQuery__
 *
 * To run a query within a React component, call `useVerifyTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenQuery(baseOptions?: Apollo.QueryHookOptions<VerifyTokenQuery, VerifyTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyTokenQuery, VerifyTokenQueryVariables>(VerifyTokenDocument, options);
      }
export function useVerifyTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyTokenQuery, VerifyTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyTokenQuery, VerifyTokenQueryVariables>(VerifyTokenDocument, options);
        }
export function useVerifyTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VerifyTokenQuery, VerifyTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VerifyTokenQuery, VerifyTokenQueryVariables>(VerifyTokenDocument, options);
        }
export type VerifyTokenQueryHookResult = ReturnType<typeof useVerifyTokenQuery>;
export type VerifyTokenLazyQueryHookResult = ReturnType<typeof useVerifyTokenLazyQuery>;
export type VerifyTokenSuspenseQueryHookResult = ReturnType<typeof useVerifyTokenSuspenseQuery>;
export type VerifyTokenQueryResult = Apollo.QueryResult<VerifyTokenQuery, VerifyTokenQueryVariables>;
export function refetchVerifyTokenQuery(variables?: VerifyTokenQueryVariables) {
      return { query: VerifyTokenDocument, variables: variables }
    }
export const GetLostWaterBranchDocument = gql`
    query GetLostWaterBranch($branchid: String, $start: String, $end: String) {
  GetLostWaterBranch(branchid: $branchid, start: $start, end: $end) {
    Quantitylevel1
    Quantitylevel2
    TimeStamp
  }
}
    `;

/**
 * __useGetLostWaterBranchQuery__
 *
 * To run a query within a React component, call `useGetLostWaterBranchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLostWaterBranchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLostWaterBranchQuery({
 *   variables: {
 *      branchid: // value for 'branchid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetLostWaterBranchQuery(baseOptions?: Apollo.QueryHookOptions<GetLostWaterBranchQuery, GetLostWaterBranchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLostWaterBranchQuery, GetLostWaterBranchQueryVariables>(GetLostWaterBranchDocument, options);
      }
export function useGetLostWaterBranchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLostWaterBranchQuery, GetLostWaterBranchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLostWaterBranchQuery, GetLostWaterBranchQueryVariables>(GetLostWaterBranchDocument, options);
        }
export function useGetLostWaterBranchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLostWaterBranchQuery, GetLostWaterBranchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLostWaterBranchQuery, GetLostWaterBranchQueryVariables>(GetLostWaterBranchDocument, options);
        }
export type GetLostWaterBranchQueryHookResult = ReturnType<typeof useGetLostWaterBranchQuery>;
export type GetLostWaterBranchLazyQueryHookResult = ReturnType<typeof useGetLostWaterBranchLazyQuery>;
export type GetLostWaterBranchSuspenseQueryHookResult = ReturnType<typeof useGetLostWaterBranchSuspenseQuery>;
export type GetLostWaterBranchQueryResult = Apollo.QueryResult<GetLostWaterBranchQuery, GetLostWaterBranchQueryVariables>;
export function refetchGetLostWaterBranchQuery(variables?: GetLostWaterBranchQueryVariables) {
      return { query: GetLostWaterBranchDocument, variables: variables }
    }
export const GetDataIndexManualsDocument = gql`
    query GetDataIndexManuals {
  GetDataIndexManuals {
    SiteId
    TimeStamp
    Value
    _id
  }
}
    `;

/**
 * __useGetDataIndexManualsQuery__
 *
 * To run a query within a React component, call `useGetDataIndexManualsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataIndexManualsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataIndexManualsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataIndexManualsQuery(baseOptions?: Apollo.QueryHookOptions<GetDataIndexManualsQuery, GetDataIndexManualsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataIndexManualsQuery, GetDataIndexManualsQueryVariables>(GetDataIndexManualsDocument, options);
      }
export function useGetDataIndexManualsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataIndexManualsQuery, GetDataIndexManualsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataIndexManualsQuery, GetDataIndexManualsQueryVariables>(GetDataIndexManualsDocument, options);
        }
export function useGetDataIndexManualsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataIndexManualsQuery, GetDataIndexManualsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataIndexManualsQuery, GetDataIndexManualsQueryVariables>(GetDataIndexManualsDocument, options);
        }
export type GetDataIndexManualsQueryHookResult = ReturnType<typeof useGetDataIndexManualsQuery>;
export type GetDataIndexManualsLazyQueryHookResult = ReturnType<typeof useGetDataIndexManualsLazyQuery>;
export type GetDataIndexManualsSuspenseQueryHookResult = ReturnType<typeof useGetDataIndexManualsSuspenseQuery>;
export type GetDataIndexManualsQueryResult = Apollo.QueryResult<GetDataIndexManualsQuery, GetDataIndexManualsQueryVariables>;
export function refetchGetDataIndexManualsQuery(variables?: GetDataIndexManualsQueryVariables) {
      return { query: GetDataIndexManualsDocument, variables: variables }
    }
export const GetDataIndexManualBySiteIdDocument = gql`
    query GetDataIndexManualBySiteId($siteid: String) {
  GetDataIndexManualBySiteId(siteid: $siteid) {
    SiteId
    TimeStamp
    Value
    _id
  }
}
    `;

/**
 * __useGetDataIndexManualBySiteIdQuery__
 *
 * To run a query within a React component, call `useGetDataIndexManualBySiteIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataIndexManualBySiteIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataIndexManualBySiteIdQuery({
 *   variables: {
 *      siteid: // value for 'siteid'
 *   },
 * });
 */
export function useGetDataIndexManualBySiteIdQuery(baseOptions?: Apollo.QueryHookOptions<GetDataIndexManualBySiteIdQuery, GetDataIndexManualBySiteIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataIndexManualBySiteIdQuery, GetDataIndexManualBySiteIdQueryVariables>(GetDataIndexManualBySiteIdDocument, options);
      }
export function useGetDataIndexManualBySiteIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataIndexManualBySiteIdQuery, GetDataIndexManualBySiteIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataIndexManualBySiteIdQuery, GetDataIndexManualBySiteIdQueryVariables>(GetDataIndexManualBySiteIdDocument, options);
        }
export function useGetDataIndexManualBySiteIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataIndexManualBySiteIdQuery, GetDataIndexManualBySiteIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataIndexManualBySiteIdQuery, GetDataIndexManualBySiteIdQueryVariables>(GetDataIndexManualBySiteIdDocument, options);
        }
export type GetDataIndexManualBySiteIdQueryHookResult = ReturnType<typeof useGetDataIndexManualBySiteIdQuery>;
export type GetDataIndexManualBySiteIdLazyQueryHookResult = ReturnType<typeof useGetDataIndexManualBySiteIdLazyQuery>;
export type GetDataIndexManualBySiteIdSuspenseQueryHookResult = ReturnType<typeof useGetDataIndexManualBySiteIdSuspenseQuery>;
export type GetDataIndexManualBySiteIdQueryResult = Apollo.QueryResult<GetDataIndexManualBySiteIdQuery, GetDataIndexManualBySiteIdQueryVariables>;
export function refetchGetDataIndexManualBySiteIdQuery(variables?: GetDataIndexManualBySiteIdQueryVariables) {
      return { query: GetDataIndexManualBySiteIdDocument, variables: variables }
    }
export const InsertManualIndexDocument = gql`
    mutation InsertManualIndex($data: ManualIndexInsertInput) {
  InsertManualIndex(data: $data)
}
    `;
export type InsertManualIndexMutationFn = Apollo.MutationFunction<InsertManualIndexMutation, InsertManualIndexMutationVariables>;

/**
 * __useInsertManualIndexMutation__
 *
 * To run a mutation, you first call `useInsertManualIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertManualIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertManualIndexMutation, { data, loading, error }] = useInsertManualIndexMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertManualIndexMutation(baseOptions?: Apollo.MutationHookOptions<InsertManualIndexMutation, InsertManualIndexMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertManualIndexMutation, InsertManualIndexMutationVariables>(InsertManualIndexDocument, options);
      }
export type InsertManualIndexMutationHookResult = ReturnType<typeof useInsertManualIndexMutation>;
export type InsertManualIndexMutationResult = Apollo.MutationResult<InsertManualIndexMutation>;
export type InsertManualIndexMutationOptions = Apollo.BaseMutationOptions<InsertManualIndexMutation, InsertManualIndexMutationVariables>;
export const UpdateManualIndexDocument = gql`
    mutation UpdateManualIndex($data: ManualIndexUpdateInput) {
  UpdateManualIndex(data: $data)
}
    `;
export type UpdateManualIndexMutationFn = Apollo.MutationFunction<UpdateManualIndexMutation, UpdateManualIndexMutationVariables>;

/**
 * __useUpdateManualIndexMutation__
 *
 * To run a mutation, you first call `useUpdateManualIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateManualIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateManualIndexMutation, { data, loading, error }] = useUpdateManualIndexMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateManualIndexMutation(baseOptions?: Apollo.MutationHookOptions<UpdateManualIndexMutation, UpdateManualIndexMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateManualIndexMutation, UpdateManualIndexMutationVariables>(UpdateManualIndexDocument, options);
      }
export type UpdateManualIndexMutationHookResult = ReturnType<typeof useUpdateManualIndexMutation>;
export type UpdateManualIndexMutationResult = Apollo.MutationResult<UpdateManualIndexMutation>;
export type UpdateManualIndexMutationOptions = Apollo.BaseMutationOptions<UpdateManualIndexMutation, UpdateManualIndexMutationVariables>;
export const DeleteManualIndexDocument = gql`
    mutation DeleteManualIndex($data: ManualIndexUpdateInput) {
  DeleteManualIndex(data: $data)
}
    `;
export type DeleteManualIndexMutationFn = Apollo.MutationFunction<DeleteManualIndexMutation, DeleteManualIndexMutationVariables>;

/**
 * __useDeleteManualIndexMutation__
 *
 * To run a mutation, you first call `useDeleteManualIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteManualIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteManualIndexMutation, { data, loading, error }] = useDeleteManualIndexMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteManualIndexMutation(baseOptions?: Apollo.MutationHookOptions<DeleteManualIndexMutation, DeleteManualIndexMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteManualIndexMutation, DeleteManualIndexMutationVariables>(DeleteManualIndexDocument, options);
      }
export type DeleteManualIndexMutationHookResult = ReturnType<typeof useDeleteManualIndexMutation>;
export type DeleteManualIndexMutationResult = Apollo.MutationResult<DeleteManualIndexMutation>;
export type DeleteManualIndexMutationOptions = Apollo.BaseMutationOptions<DeleteManualIndexMutation, DeleteManualIndexMutationVariables>;
export const GetNodeTypesDocument = gql`
    query GetNodeTypes {
  GetNodeTypes {
    Name
    Type
    _id
  }
}
    `;

/**
 * __useGetNodeTypesQuery__
 *
 * To run a query within a React component, call `useGetNodeTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNodeTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNodeTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNodeTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetNodeTypesQuery, GetNodeTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNodeTypesQuery, GetNodeTypesQueryVariables>(GetNodeTypesDocument, options);
      }
export function useGetNodeTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNodeTypesQuery, GetNodeTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNodeTypesQuery, GetNodeTypesQueryVariables>(GetNodeTypesDocument, options);
        }
export function useGetNodeTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNodeTypesQuery, GetNodeTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNodeTypesQuery, GetNodeTypesQueryVariables>(GetNodeTypesDocument, options);
        }
export type GetNodeTypesQueryHookResult = ReturnType<typeof useGetNodeTypesQuery>;
export type GetNodeTypesLazyQueryHookResult = ReturnType<typeof useGetNodeTypesLazyQuery>;
export type GetNodeTypesSuspenseQueryHookResult = ReturnType<typeof useGetNodeTypesSuspenseQuery>;
export type GetNodeTypesQueryResult = Apollo.QueryResult<GetNodeTypesQuery, GetNodeTypesQueryVariables>;
export function refetchGetNodeTypesQuery(variables?: GetNodeTypesQueryVariables) {
      return { query: GetNodeTypesDocument, variables: variables }
    }
export const GetPipesDocument = gql`
    query GetPipes {
  GetPipes {
    BaseMax
    BaseMin
    ColorBaseMax
    ColorBaseMin
    Description
    GroupPipeId
    Length
    Name
    PipeId
    Size
    TypeChannelAlarm
    _id
    SetPrioritize
  }
}
    `;

/**
 * __useGetPipesQuery__
 *
 * To run a query within a React component, call `useGetPipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPipesQuery(baseOptions?: Apollo.QueryHookOptions<GetPipesQuery, GetPipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPipesQuery, GetPipesQueryVariables>(GetPipesDocument, options);
      }
export function useGetPipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPipesQuery, GetPipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPipesQuery, GetPipesQueryVariables>(GetPipesDocument, options);
        }
export function useGetPipesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPipesQuery, GetPipesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPipesQuery, GetPipesQueryVariables>(GetPipesDocument, options);
        }
export type GetPipesQueryHookResult = ReturnType<typeof useGetPipesQuery>;
export type GetPipesLazyQueryHookResult = ReturnType<typeof useGetPipesLazyQuery>;
export type GetPipesSuspenseQueryHookResult = ReturnType<typeof useGetPipesSuspenseQuery>;
export type GetPipesQueryResult = Apollo.QueryResult<GetPipesQuery, GetPipesQueryVariables>;
export function refetchGetPipesQuery(variables?: GetPipesQueryVariables) {
      return { query: GetPipesDocument, variables: variables }
    }
export const InsertPipeDocument = gql`
    mutation InsertPipe($pipe: PipeInsertInput) {
  InsertPipe(pipe: $pipe)
}
    `;
export type InsertPipeMutationFn = Apollo.MutationFunction<InsertPipeMutation, InsertPipeMutationVariables>;

/**
 * __useInsertPipeMutation__
 *
 * To run a mutation, you first call `useInsertPipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPipeMutation, { data, loading, error }] = useInsertPipeMutation({
 *   variables: {
 *      pipe: // value for 'pipe'
 *   },
 * });
 */
export function useInsertPipeMutation(baseOptions?: Apollo.MutationHookOptions<InsertPipeMutation, InsertPipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPipeMutation, InsertPipeMutationVariables>(InsertPipeDocument, options);
      }
export type InsertPipeMutationHookResult = ReturnType<typeof useInsertPipeMutation>;
export type InsertPipeMutationResult = Apollo.MutationResult<InsertPipeMutation>;
export type InsertPipeMutationOptions = Apollo.BaseMutationOptions<InsertPipeMutation, InsertPipeMutationVariables>;
export const UpdatePipeDocument = gql`
    mutation UpdatePipe($pipe: PipeUpdateInput) {
  UpdatePipe(pipe: $pipe)
}
    `;
export type UpdatePipeMutationFn = Apollo.MutationFunction<UpdatePipeMutation, UpdatePipeMutationVariables>;

/**
 * __useUpdatePipeMutation__
 *
 * To run a mutation, you first call `useUpdatePipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePipeMutation, { data, loading, error }] = useUpdatePipeMutation({
 *   variables: {
 *      pipe: // value for 'pipe'
 *   },
 * });
 */
export function useUpdatePipeMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePipeMutation, UpdatePipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePipeMutation, UpdatePipeMutationVariables>(UpdatePipeDocument, options);
      }
export type UpdatePipeMutationHookResult = ReturnType<typeof useUpdatePipeMutation>;
export type UpdatePipeMutationResult = Apollo.MutationResult<UpdatePipeMutation>;
export type UpdatePipeMutationOptions = Apollo.BaseMutationOptions<UpdatePipeMutation, UpdatePipeMutationVariables>;
export const DeletePipeDocument = gql`
    mutation DeletePipe($pipe: PipeUpdateInput) {
  DeletePipe(pipe: $pipe)
}
    `;
export type DeletePipeMutationFn = Apollo.MutationFunction<DeletePipeMutation, DeletePipeMutationVariables>;

/**
 * __useDeletePipeMutation__
 *
 * To run a mutation, you first call `useDeletePipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePipeMutation, { data, loading, error }] = useDeletePipeMutation({
 *   variables: {
 *      pipe: // value for 'pipe'
 *   },
 * });
 */
export function useDeletePipeMutation(baseOptions?: Apollo.MutationHookOptions<DeletePipeMutation, DeletePipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePipeMutation, DeletePipeMutationVariables>(DeletePipeDocument, options);
      }
export type DeletePipeMutationHookResult = ReturnType<typeof useDeletePipeMutation>;
export type DeletePipeMutationResult = Apollo.MutationResult<DeletePipeMutation>;
export type DeletePipeMutationOptions = Apollo.BaseMutationOptions<DeletePipeMutation, DeletePipeMutationVariables>;
export const GetTotalQuantityByTimeStampDocument = gql`
    query GetTotalQuantityByTimeStamp($siteid: String, $start: String, $end: String) {
  GetTotalQuantityByTimeStamp(siteid: $siteid, start: $start, end: $end)
}
    `;

/**
 * __useGetTotalQuantityByTimeStampQuery__
 *
 * To run a query within a React component, call `useGetTotalQuantityByTimeStampQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalQuantityByTimeStampQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalQuantityByTimeStampQuery({
 *   variables: {
 *      siteid: // value for 'siteid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetTotalQuantityByTimeStampQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalQuantityByTimeStampQuery, GetTotalQuantityByTimeStampQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalQuantityByTimeStampQuery, GetTotalQuantityByTimeStampQueryVariables>(GetTotalQuantityByTimeStampDocument, options);
      }
export function useGetTotalQuantityByTimeStampLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalQuantityByTimeStampQuery, GetTotalQuantityByTimeStampQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalQuantityByTimeStampQuery, GetTotalQuantityByTimeStampQueryVariables>(GetTotalQuantityByTimeStampDocument, options);
        }
export function useGetTotalQuantityByTimeStampSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTotalQuantityByTimeStampQuery, GetTotalQuantityByTimeStampQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalQuantityByTimeStampQuery, GetTotalQuantityByTimeStampQueryVariables>(GetTotalQuantityByTimeStampDocument, options);
        }
export type GetTotalQuantityByTimeStampQueryHookResult = ReturnType<typeof useGetTotalQuantityByTimeStampQuery>;
export type GetTotalQuantityByTimeStampLazyQueryHookResult = ReturnType<typeof useGetTotalQuantityByTimeStampLazyQuery>;
export type GetTotalQuantityByTimeStampSuspenseQueryHookResult = ReturnType<typeof useGetTotalQuantityByTimeStampSuspenseQuery>;
export type GetTotalQuantityByTimeStampQueryResult = Apollo.QueryResult<GetTotalQuantityByTimeStampQuery, GetTotalQuantityByTimeStampQueryVariables>;
export function refetchGetTotalQuantityByTimeStampQuery(variables?: GetTotalQuantityByTimeStampQueryVariables) {
      return { query: GetTotalQuantityByTimeStampDocument, variables: variables }
    }
export const GetQuantityHourlyDocument = gql`
    query GetQuantityHourly($siteid: String, $start: String, $end: String) {
  GetQuantityHourly(siteid: $siteid, start: $start, end: $end) {
    AvgFlow
    Index
    MaxFlow
    MinFlow
    Quantity
    TimeStamp
    AvgPressure
    MaxPressure
    MinPressure
  }
}
    `;

/**
 * __useGetQuantityHourlyQuery__
 *
 * To run a query within a React component, call `useGetQuantityHourlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityHourlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityHourlyQuery({
 *   variables: {
 *      siteid: // value for 'siteid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityHourlyQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityHourlyQuery, GetQuantityHourlyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityHourlyQuery, GetQuantityHourlyQueryVariables>(GetQuantityHourlyDocument, options);
      }
export function useGetQuantityHourlyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityHourlyQuery, GetQuantityHourlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityHourlyQuery, GetQuantityHourlyQueryVariables>(GetQuantityHourlyDocument, options);
        }
export function useGetQuantityHourlySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityHourlyQuery, GetQuantityHourlyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityHourlyQuery, GetQuantityHourlyQueryVariables>(GetQuantityHourlyDocument, options);
        }
export type GetQuantityHourlyQueryHookResult = ReturnType<typeof useGetQuantityHourlyQuery>;
export type GetQuantityHourlyLazyQueryHookResult = ReturnType<typeof useGetQuantityHourlyLazyQuery>;
export type GetQuantityHourlySuspenseQueryHookResult = ReturnType<typeof useGetQuantityHourlySuspenseQuery>;
export type GetQuantityHourlyQueryResult = Apollo.QueryResult<GetQuantityHourlyQuery, GetQuantityHourlyQueryVariables>;
export function refetchGetQuantityHourlyQuery(variables?: GetQuantityHourlyQueryVariables) {
      return { query: GetQuantityHourlyDocument, variables: variables }
    }
export const GetQuantityDailyDocument = gql`
    query GetQuantityDaily($siteid: String, $start: String, $end: String) {
  GetQuantityDaily(siteid: $siteid, start: $start, end: $end) {
    AvgFlow
    Index
    MaxFlow
    MinFlow
    Quantity
    TimeStamp
    AvgPressure
    MaxPressure
    MinPressure
  }
}
    `;

/**
 * __useGetQuantityDailyQuery__
 *
 * To run a query within a React component, call `useGetQuantityDailyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityDailyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityDailyQuery({
 *   variables: {
 *      siteid: // value for 'siteid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityDailyQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityDailyQuery, GetQuantityDailyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityDailyQuery, GetQuantityDailyQueryVariables>(GetQuantityDailyDocument, options);
      }
export function useGetQuantityDailyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityDailyQuery, GetQuantityDailyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityDailyQuery, GetQuantityDailyQueryVariables>(GetQuantityDailyDocument, options);
        }
export function useGetQuantityDailySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityDailyQuery, GetQuantityDailyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityDailyQuery, GetQuantityDailyQueryVariables>(GetQuantityDailyDocument, options);
        }
export type GetQuantityDailyQueryHookResult = ReturnType<typeof useGetQuantityDailyQuery>;
export type GetQuantityDailyLazyQueryHookResult = ReturnType<typeof useGetQuantityDailyLazyQuery>;
export type GetQuantityDailySuspenseQueryHookResult = ReturnType<typeof useGetQuantityDailySuspenseQuery>;
export type GetQuantityDailyQueryResult = Apollo.QueryResult<GetQuantityDailyQuery, GetQuantityDailyQueryVariables>;
export function refetchGetQuantityDailyQuery(variables?: GetQuantityDailyQueryVariables) {
      return { query: GetQuantityDailyDocument, variables: variables }
    }
export const GetQuantityMonthlyDocument = gql`
    query GetQuantityMonthly($siteid: String, $start: String, $end: String) {
  GetQuantityMonthly(siteid: $siteid, start: $start, end: $end) {
    AvgFlow
    Index
    MaxFlow
    MinFlow
    Quantity
    TimeStamp
    AvgPressure
    MaxPressure
    MinPressure
  }
}
    `;

/**
 * __useGetQuantityMonthlyQuery__
 *
 * To run a query within a React component, call `useGetQuantityMonthlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityMonthlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityMonthlyQuery({
 *   variables: {
 *      siteid: // value for 'siteid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityMonthlyQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityMonthlyQuery, GetQuantityMonthlyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityMonthlyQuery, GetQuantityMonthlyQueryVariables>(GetQuantityMonthlyDocument, options);
      }
export function useGetQuantityMonthlyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityMonthlyQuery, GetQuantityMonthlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityMonthlyQuery, GetQuantityMonthlyQueryVariables>(GetQuantityMonthlyDocument, options);
        }
export function useGetQuantityMonthlySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityMonthlyQuery, GetQuantityMonthlyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityMonthlyQuery, GetQuantityMonthlyQueryVariables>(GetQuantityMonthlyDocument, options);
        }
export type GetQuantityMonthlyQueryHookResult = ReturnType<typeof useGetQuantityMonthlyQuery>;
export type GetQuantityMonthlyLazyQueryHookResult = ReturnType<typeof useGetQuantityMonthlyLazyQuery>;
export type GetQuantityMonthlySuspenseQueryHookResult = ReturnType<typeof useGetQuantityMonthlySuspenseQuery>;
export type GetQuantityMonthlyQueryResult = Apollo.QueryResult<GetQuantityMonthlyQuery, GetQuantityMonthlyQueryVariables>;
export function refetchGetQuantityMonthlyQuery(variables?: GetQuantityMonthlyQueryVariables) {
      return { query: GetQuantityMonthlyDocument, variables: variables }
    }
export const GetQuantityYearlyDocument = gql`
    query GetQuantityYearly($siteid: String, $start: String, $end: String) {
  GetQuantityYearly(siteid: $siteid, start: $start, end: $end) {
    AvgFlow
    Index
    MaxFlow
    MinFlow
    Quantity
    TimeStamp
    AvgPressure
    MaxPressure
    MinPressure
  }
}
    `;

/**
 * __useGetQuantityYearlyQuery__
 *
 * To run a query within a React component, call `useGetQuantityYearlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityYearlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityYearlyQuery({
 *   variables: {
 *      siteid: // value for 'siteid'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityYearlyQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityYearlyQuery, GetQuantityYearlyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityYearlyQuery, GetQuantityYearlyQueryVariables>(GetQuantityYearlyDocument, options);
      }
export function useGetQuantityYearlyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityYearlyQuery, GetQuantityYearlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityYearlyQuery, GetQuantityYearlyQueryVariables>(GetQuantityYearlyDocument, options);
        }
export function useGetQuantityYearlySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityYearlyQuery, GetQuantityYearlyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityYearlyQuery, GetQuantityYearlyQueryVariables>(GetQuantityYearlyDocument, options);
        }
export type GetQuantityYearlyQueryHookResult = ReturnType<typeof useGetQuantityYearlyQuery>;
export type GetQuantityYearlyLazyQueryHookResult = ReturnType<typeof useGetQuantityYearlyLazyQuery>;
export type GetQuantityYearlySuspenseQueryHookResult = ReturnType<typeof useGetQuantityYearlySuspenseQuery>;
export type GetQuantityYearlyQueryResult = Apollo.QueryResult<GetQuantityYearlyQuery, GetQuantityYearlyQueryVariables>;
export function refetchGetQuantityYearlyQuery(variables?: GetQuantityYearlyQueryVariables) {
      return { query: GetQuantityYearlyDocument, variables: variables }
    }
export const GetQuantityDailyNmDocument = gql`
    query GetQuantityDailyNM($year: Int, $month: Int) {
  GetQuantityDailyNM(year: $year, month: $month) {
    GD1
    GD2
    GD3
    TimeStamp
    Total
  }
}
    `;

/**
 * __useGetQuantityDailyNmQuery__
 *
 * To run a query within a React component, call `useGetQuantityDailyNmQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityDailyNmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityDailyNmQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useGetQuantityDailyNmQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityDailyNmQuery, GetQuantityDailyNmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityDailyNmQuery, GetQuantityDailyNmQueryVariables>(GetQuantityDailyNmDocument, options);
      }
export function useGetQuantityDailyNmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityDailyNmQuery, GetQuantityDailyNmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityDailyNmQuery, GetQuantityDailyNmQueryVariables>(GetQuantityDailyNmDocument, options);
        }
export function useGetQuantityDailyNmSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityDailyNmQuery, GetQuantityDailyNmQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityDailyNmQuery, GetQuantityDailyNmQueryVariables>(GetQuantityDailyNmDocument, options);
        }
export type GetQuantityDailyNmQueryHookResult = ReturnType<typeof useGetQuantityDailyNmQuery>;
export type GetQuantityDailyNmLazyQueryHookResult = ReturnType<typeof useGetQuantityDailyNmLazyQuery>;
export type GetQuantityDailyNmSuspenseQueryHookResult = ReturnType<typeof useGetQuantityDailyNmSuspenseQuery>;
export type GetQuantityDailyNmQueryResult = Apollo.QueryResult<GetQuantityDailyNmQuery, GetQuantityDailyNmQueryVariables>;
export function refetchGetQuantityDailyNmQuery(variables?: GetQuantityDailyNmQueryVariables) {
      return { query: GetQuantityDailyNmDocument, variables: variables }
    }
export const GetQuantityMonthlyNmDocument = gql`
    query GetQuantityMonthlyNM($start: String, $end: String) {
  GetQuantityMonthlyNM(start: $start, end: $end) {
    AvgValue
    CountDay
    EndDate
    IsEnoughData
    StartDate
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetQuantityMonthlyNmQuery__
 *
 * To run a query within a React component, call `useGetQuantityMonthlyNmQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityMonthlyNmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityMonthlyNmQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityMonthlyNmQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityMonthlyNmQuery, GetQuantityMonthlyNmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityMonthlyNmQuery, GetQuantityMonthlyNmQueryVariables>(GetQuantityMonthlyNmDocument, options);
      }
export function useGetQuantityMonthlyNmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityMonthlyNmQuery, GetQuantityMonthlyNmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityMonthlyNmQuery, GetQuantityMonthlyNmQueryVariables>(GetQuantityMonthlyNmDocument, options);
        }
export function useGetQuantityMonthlyNmSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityMonthlyNmQuery, GetQuantityMonthlyNmQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityMonthlyNmQuery, GetQuantityMonthlyNmQueryVariables>(GetQuantityMonthlyNmDocument, options);
        }
export type GetQuantityMonthlyNmQueryHookResult = ReturnType<typeof useGetQuantityMonthlyNmQuery>;
export type GetQuantityMonthlyNmLazyQueryHookResult = ReturnType<typeof useGetQuantityMonthlyNmLazyQuery>;
export type GetQuantityMonthlyNmSuspenseQueryHookResult = ReturnType<typeof useGetQuantityMonthlyNmSuspenseQuery>;
export type GetQuantityMonthlyNmQueryResult = Apollo.QueryResult<GetQuantityMonthlyNmQuery, GetQuantityMonthlyNmQueryVariables>;
export function refetchGetQuantityMonthlyNmQuery(variables?: GetQuantityMonthlyNmQueryVariables) {
      return { query: GetQuantityMonthlyNmDocument, variables: variables }
    }
export const GetQuantityYearlyNmDocument = gql`
    query GetQuantityYearlyNM($start: String, $end: String) {
  GetQuantityYearlyNM(start: $start, end: $end) {
    AvgValue
    CountDay
    EndDate
    IsEnoughData
    StartDate
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetQuantityYearlyNmQuery__
 *
 * To run a query within a React component, call `useGetQuantityYearlyNmQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityYearlyNmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityYearlyNmQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityYearlyNmQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityYearlyNmQuery, GetQuantityYearlyNmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityYearlyNmQuery, GetQuantityYearlyNmQueryVariables>(GetQuantityYearlyNmDocument, options);
      }
export function useGetQuantityYearlyNmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityYearlyNmQuery, GetQuantityYearlyNmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityYearlyNmQuery, GetQuantityYearlyNmQueryVariables>(GetQuantityYearlyNmDocument, options);
        }
export function useGetQuantityYearlyNmSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityYearlyNmQuery, GetQuantityYearlyNmQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityYearlyNmQuery, GetQuantityYearlyNmQueryVariables>(GetQuantityYearlyNmDocument, options);
        }
export type GetQuantityYearlyNmQueryHookResult = ReturnType<typeof useGetQuantityYearlyNmQuery>;
export type GetQuantityYearlyNmLazyQueryHookResult = ReturnType<typeof useGetQuantityYearlyNmLazyQuery>;
export type GetQuantityYearlyNmSuspenseQueryHookResult = ReturnType<typeof useGetQuantityYearlyNmSuspenseQuery>;
export type GetQuantityYearlyNmQueryResult = Apollo.QueryResult<GetQuantityYearlyNmQuery, GetQuantityYearlyNmQueryVariables>;
export function refetchGetQuantityYearlyNmQuery(variables?: GetQuantityYearlyNmQueryVariables) {
      return { query: GetQuantityYearlyNmDocument, variables: variables }
    }
export const GetManualIndexDailyNmDocument = gql`
    query GetManualIndexDailyNM($year: Int, $month: Int) {
  GetManualIndexDailyNM(year: $year, month: $month) {
    GD1
    GD2
    GD3
    TimeStamp
    Total
  }
}
    `;

/**
 * __useGetManualIndexDailyNmQuery__
 *
 * To run a query within a React component, call `useGetManualIndexDailyNmQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexDailyNmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexDailyNmQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useGetManualIndexDailyNmQuery(baseOptions?: Apollo.QueryHookOptions<GetManualIndexDailyNmQuery, GetManualIndexDailyNmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexDailyNmQuery, GetManualIndexDailyNmQueryVariables>(GetManualIndexDailyNmDocument, options);
      }
export function useGetManualIndexDailyNmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexDailyNmQuery, GetManualIndexDailyNmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexDailyNmQuery, GetManualIndexDailyNmQueryVariables>(GetManualIndexDailyNmDocument, options);
        }
export function useGetManualIndexDailyNmSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexDailyNmQuery, GetManualIndexDailyNmQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexDailyNmQuery, GetManualIndexDailyNmQueryVariables>(GetManualIndexDailyNmDocument, options);
        }
export type GetManualIndexDailyNmQueryHookResult = ReturnType<typeof useGetManualIndexDailyNmQuery>;
export type GetManualIndexDailyNmLazyQueryHookResult = ReturnType<typeof useGetManualIndexDailyNmLazyQuery>;
export type GetManualIndexDailyNmSuspenseQueryHookResult = ReturnType<typeof useGetManualIndexDailyNmSuspenseQuery>;
export type GetManualIndexDailyNmQueryResult = Apollo.QueryResult<GetManualIndexDailyNmQuery, GetManualIndexDailyNmQueryVariables>;
export function refetchGetManualIndexDailyNmQuery(variables?: GetManualIndexDailyNmQueryVariables) {
      return { query: GetManualIndexDailyNmDocument, variables: variables }
    }
export const GetManualIndexMonthlyNmDocument = gql`
    query GetManualIndexMonthlyNM($start: String, $end: String) {
  GetManualIndexMonthlyNM(start: $start, end: $end) {
    AvgValue
    CountDay
    EndDate
    IsEnoughData
    StartDate
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetManualIndexMonthlyNmQuery__
 *
 * To run a query within a React component, call `useGetManualIndexMonthlyNmQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexMonthlyNmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexMonthlyNmQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetManualIndexMonthlyNmQuery(baseOptions?: Apollo.QueryHookOptions<GetManualIndexMonthlyNmQuery, GetManualIndexMonthlyNmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexMonthlyNmQuery, GetManualIndexMonthlyNmQueryVariables>(GetManualIndexMonthlyNmDocument, options);
      }
export function useGetManualIndexMonthlyNmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexMonthlyNmQuery, GetManualIndexMonthlyNmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexMonthlyNmQuery, GetManualIndexMonthlyNmQueryVariables>(GetManualIndexMonthlyNmDocument, options);
        }
export function useGetManualIndexMonthlyNmSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexMonthlyNmQuery, GetManualIndexMonthlyNmQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexMonthlyNmQuery, GetManualIndexMonthlyNmQueryVariables>(GetManualIndexMonthlyNmDocument, options);
        }
export type GetManualIndexMonthlyNmQueryHookResult = ReturnType<typeof useGetManualIndexMonthlyNmQuery>;
export type GetManualIndexMonthlyNmLazyQueryHookResult = ReturnType<typeof useGetManualIndexMonthlyNmLazyQuery>;
export type GetManualIndexMonthlyNmSuspenseQueryHookResult = ReturnType<typeof useGetManualIndexMonthlyNmSuspenseQuery>;
export type GetManualIndexMonthlyNmQueryResult = Apollo.QueryResult<GetManualIndexMonthlyNmQuery, GetManualIndexMonthlyNmQueryVariables>;
export function refetchGetManualIndexMonthlyNmQuery(variables?: GetManualIndexMonthlyNmQueryVariables) {
      return { query: GetManualIndexMonthlyNmDocument, variables: variables }
    }
export const GetManualIndexYearlyNmDocument = gql`
    query GetManualIndexYearlyNM($start: String, $end: String) {
  GetManualIndexYearlyNM(start: $start, end: $end) {
    AvgValue
    CountDay
    EndDate
    IsEnoughData
    StartDate
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetManualIndexYearlyNmQuery__
 *
 * To run a query within a React component, call `useGetManualIndexYearlyNmQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexYearlyNmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexYearlyNmQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetManualIndexYearlyNmQuery(baseOptions?: Apollo.QueryHookOptions<GetManualIndexYearlyNmQuery, GetManualIndexYearlyNmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexYearlyNmQuery, GetManualIndexYearlyNmQueryVariables>(GetManualIndexYearlyNmDocument, options);
      }
export function useGetManualIndexYearlyNmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexYearlyNmQuery, GetManualIndexYearlyNmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexYearlyNmQuery, GetManualIndexYearlyNmQueryVariables>(GetManualIndexYearlyNmDocument, options);
        }
export function useGetManualIndexYearlyNmSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexYearlyNmQuery, GetManualIndexYearlyNmQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexYearlyNmQuery, GetManualIndexYearlyNmQueryVariables>(GetManualIndexYearlyNmDocument, options);
        }
export type GetManualIndexYearlyNmQueryHookResult = ReturnType<typeof useGetManualIndexYearlyNmQuery>;
export type GetManualIndexYearlyNmLazyQueryHookResult = ReturnType<typeof useGetManualIndexYearlyNmLazyQuery>;
export type GetManualIndexYearlyNmSuspenseQueryHookResult = ReturnType<typeof useGetManualIndexYearlyNmSuspenseQuery>;
export type GetManualIndexYearlyNmQueryResult = Apollo.QueryResult<GetManualIndexYearlyNmQuery, GetManualIndexYearlyNmQueryVariables>;
export function refetchGetManualIndexYearlyNmQuery(variables?: GetManualIndexYearlyNmQueryVariables) {
      return { query: GetManualIndexYearlyNmDocument, variables: variables }
    }
export const GetQuantityDailyNtDocument = gql`
    query GetQuantityDailyNT($year: Int, $month: Int) {
  GetQuantityDailyNT(year: $year, month: $month) {
    GD1
    GD2
    GD3
    TimeStamp
    Total
  }
}
    `;

/**
 * __useGetQuantityDailyNtQuery__
 *
 * To run a query within a React component, call `useGetQuantityDailyNtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityDailyNtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityDailyNtQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useGetQuantityDailyNtQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityDailyNtQuery, GetQuantityDailyNtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityDailyNtQuery, GetQuantityDailyNtQueryVariables>(GetQuantityDailyNtDocument, options);
      }
export function useGetQuantityDailyNtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityDailyNtQuery, GetQuantityDailyNtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityDailyNtQuery, GetQuantityDailyNtQueryVariables>(GetQuantityDailyNtDocument, options);
        }
export function useGetQuantityDailyNtSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityDailyNtQuery, GetQuantityDailyNtQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityDailyNtQuery, GetQuantityDailyNtQueryVariables>(GetQuantityDailyNtDocument, options);
        }
export type GetQuantityDailyNtQueryHookResult = ReturnType<typeof useGetQuantityDailyNtQuery>;
export type GetQuantityDailyNtLazyQueryHookResult = ReturnType<typeof useGetQuantityDailyNtLazyQuery>;
export type GetQuantityDailyNtSuspenseQueryHookResult = ReturnType<typeof useGetQuantityDailyNtSuspenseQuery>;
export type GetQuantityDailyNtQueryResult = Apollo.QueryResult<GetQuantityDailyNtQuery, GetQuantityDailyNtQueryVariables>;
export function refetchGetQuantityDailyNtQuery(variables?: GetQuantityDailyNtQueryVariables) {
      return { query: GetQuantityDailyNtDocument, variables: variables }
    }
export const GetQuantityMonthlyNtDocument = gql`
    query GetQuantityMonthlyNT($start: String, $end: String) {
  GetQuantityMonthlyNT(start: $start, end: $end) {
    AvgValue
    CountDay
    EndDate
    IsEnoughData
    StartDate
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetQuantityMonthlyNtQuery__
 *
 * To run a query within a React component, call `useGetQuantityMonthlyNtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityMonthlyNtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityMonthlyNtQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityMonthlyNtQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityMonthlyNtQuery, GetQuantityMonthlyNtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityMonthlyNtQuery, GetQuantityMonthlyNtQueryVariables>(GetQuantityMonthlyNtDocument, options);
      }
export function useGetQuantityMonthlyNtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityMonthlyNtQuery, GetQuantityMonthlyNtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityMonthlyNtQuery, GetQuantityMonthlyNtQueryVariables>(GetQuantityMonthlyNtDocument, options);
        }
export function useGetQuantityMonthlyNtSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityMonthlyNtQuery, GetQuantityMonthlyNtQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityMonthlyNtQuery, GetQuantityMonthlyNtQueryVariables>(GetQuantityMonthlyNtDocument, options);
        }
export type GetQuantityMonthlyNtQueryHookResult = ReturnType<typeof useGetQuantityMonthlyNtQuery>;
export type GetQuantityMonthlyNtLazyQueryHookResult = ReturnType<typeof useGetQuantityMonthlyNtLazyQuery>;
export type GetQuantityMonthlyNtSuspenseQueryHookResult = ReturnType<typeof useGetQuantityMonthlyNtSuspenseQuery>;
export type GetQuantityMonthlyNtQueryResult = Apollo.QueryResult<GetQuantityMonthlyNtQuery, GetQuantityMonthlyNtQueryVariables>;
export function refetchGetQuantityMonthlyNtQuery(variables?: GetQuantityMonthlyNtQueryVariables) {
      return { query: GetQuantityMonthlyNtDocument, variables: variables }
    }
export const GetQuantityYearlyNtDocument = gql`
    query GetQuantityYearlyNT($start: String, $end: String) {
  GetQuantityYearlyNT(start: $start, end: $end) {
    AvgValue
    CountDay
    EndDate
    IsEnoughData
    StartDate
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetQuantityYearlyNtQuery__
 *
 * To run a query within a React component, call `useGetQuantityYearlyNtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityYearlyNtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityYearlyNtQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityYearlyNtQuery(baseOptions?: Apollo.QueryHookOptions<GetQuantityYearlyNtQuery, GetQuantityYearlyNtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityYearlyNtQuery, GetQuantityYearlyNtQueryVariables>(GetQuantityYearlyNtDocument, options);
      }
export function useGetQuantityYearlyNtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityYearlyNtQuery, GetQuantityYearlyNtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityYearlyNtQuery, GetQuantityYearlyNtQueryVariables>(GetQuantityYearlyNtDocument, options);
        }
export function useGetQuantityYearlyNtSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityYearlyNtQuery, GetQuantityYearlyNtQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityYearlyNtQuery, GetQuantityYearlyNtQueryVariables>(GetQuantityYearlyNtDocument, options);
        }
export type GetQuantityYearlyNtQueryHookResult = ReturnType<typeof useGetQuantityYearlyNtQuery>;
export type GetQuantityYearlyNtLazyQueryHookResult = ReturnType<typeof useGetQuantityYearlyNtLazyQuery>;
export type GetQuantityYearlyNtSuspenseQueryHookResult = ReturnType<typeof useGetQuantityYearlyNtSuspenseQuery>;
export type GetQuantityYearlyNtQueryResult = Apollo.QueryResult<GetQuantityYearlyNtQuery, GetQuantityYearlyNtQueryVariables>;
export function refetchGetQuantityYearlyNtQuery(variables?: GetQuantityYearlyNtQueryVariables) {
      return { query: GetQuantityYearlyNtDocument, variables: variables }
    }
export const GetManualIndexDailyNtDocument = gql`
    query GetManualIndexDailyNT($year: Int, $month: Int) {
  GetManualIndexDailyNT(year: $year, month: $month) {
    GD1
    GD2
    GD3
    TimeStamp
    Total
  }
}
    `;

/**
 * __useGetManualIndexDailyNtQuery__
 *
 * To run a query within a React component, call `useGetManualIndexDailyNtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexDailyNtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexDailyNtQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useGetManualIndexDailyNtQuery(baseOptions?: Apollo.QueryHookOptions<GetManualIndexDailyNtQuery, GetManualIndexDailyNtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexDailyNtQuery, GetManualIndexDailyNtQueryVariables>(GetManualIndexDailyNtDocument, options);
      }
export function useGetManualIndexDailyNtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexDailyNtQuery, GetManualIndexDailyNtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexDailyNtQuery, GetManualIndexDailyNtQueryVariables>(GetManualIndexDailyNtDocument, options);
        }
export function useGetManualIndexDailyNtSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexDailyNtQuery, GetManualIndexDailyNtQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexDailyNtQuery, GetManualIndexDailyNtQueryVariables>(GetManualIndexDailyNtDocument, options);
        }
export type GetManualIndexDailyNtQueryHookResult = ReturnType<typeof useGetManualIndexDailyNtQuery>;
export type GetManualIndexDailyNtLazyQueryHookResult = ReturnType<typeof useGetManualIndexDailyNtLazyQuery>;
export type GetManualIndexDailyNtSuspenseQueryHookResult = ReturnType<typeof useGetManualIndexDailyNtSuspenseQuery>;
export type GetManualIndexDailyNtQueryResult = Apollo.QueryResult<GetManualIndexDailyNtQuery, GetManualIndexDailyNtQueryVariables>;
export function refetchGetManualIndexDailyNtQuery(variables?: GetManualIndexDailyNtQueryVariables) {
      return { query: GetManualIndexDailyNtDocument, variables: variables }
    }
export const GetManualIndexMonthlyNtDocument = gql`
    query GetManualIndexMonthlyNT($start: String, $end: String) {
  GetManualIndexMonthlyNT(start: $start, end: $end) {
    AvgValue
    CountDay
    EndDate
    IsEnoughData
    StartDate
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetManualIndexMonthlyNtQuery__
 *
 * To run a query within a React component, call `useGetManualIndexMonthlyNtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexMonthlyNtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexMonthlyNtQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetManualIndexMonthlyNtQuery(baseOptions?: Apollo.QueryHookOptions<GetManualIndexMonthlyNtQuery, GetManualIndexMonthlyNtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexMonthlyNtQuery, GetManualIndexMonthlyNtQueryVariables>(GetManualIndexMonthlyNtDocument, options);
      }
export function useGetManualIndexMonthlyNtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexMonthlyNtQuery, GetManualIndexMonthlyNtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexMonthlyNtQuery, GetManualIndexMonthlyNtQueryVariables>(GetManualIndexMonthlyNtDocument, options);
        }
export function useGetManualIndexMonthlyNtSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexMonthlyNtQuery, GetManualIndexMonthlyNtQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexMonthlyNtQuery, GetManualIndexMonthlyNtQueryVariables>(GetManualIndexMonthlyNtDocument, options);
        }
export type GetManualIndexMonthlyNtQueryHookResult = ReturnType<typeof useGetManualIndexMonthlyNtQuery>;
export type GetManualIndexMonthlyNtLazyQueryHookResult = ReturnType<typeof useGetManualIndexMonthlyNtLazyQuery>;
export type GetManualIndexMonthlyNtSuspenseQueryHookResult = ReturnType<typeof useGetManualIndexMonthlyNtSuspenseQuery>;
export type GetManualIndexMonthlyNtQueryResult = Apollo.QueryResult<GetManualIndexMonthlyNtQuery, GetManualIndexMonthlyNtQueryVariables>;
export function refetchGetManualIndexMonthlyNtQuery(variables?: GetManualIndexMonthlyNtQueryVariables) {
      return { query: GetManualIndexMonthlyNtDocument, variables: variables }
    }
export const GetManualIndexYearlyNtDocument = gql`
    query GetManualIndexYearlyNT($start: String, $end: String) {
  GetManualIndexYearlyNT(start: $start, end: $end) {
    AvgValue
    CountDay
    EndDate
    IsEnoughData
    StartDate
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetManualIndexYearlyNtQuery__
 *
 * To run a query within a React component, call `useGetManualIndexYearlyNtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexYearlyNtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexYearlyNtQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetManualIndexYearlyNtQuery(baseOptions?: Apollo.QueryHookOptions<GetManualIndexYearlyNtQuery, GetManualIndexYearlyNtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexYearlyNtQuery, GetManualIndexYearlyNtQueryVariables>(GetManualIndexYearlyNtDocument, options);
      }
export function useGetManualIndexYearlyNtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexYearlyNtQuery, GetManualIndexYearlyNtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexYearlyNtQuery, GetManualIndexYearlyNtQueryVariables>(GetManualIndexYearlyNtDocument, options);
        }
export function useGetManualIndexYearlyNtSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexYearlyNtQuery, GetManualIndexYearlyNtQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexYearlyNtQuery, GetManualIndexYearlyNtQueryVariables>(GetManualIndexYearlyNtDocument, options);
        }
export type GetManualIndexYearlyNtQueryHookResult = ReturnType<typeof useGetManualIndexYearlyNtQuery>;
export type GetManualIndexYearlyNtLazyQueryHookResult = ReturnType<typeof useGetManualIndexYearlyNtLazyQuery>;
export type GetManualIndexYearlyNtSuspenseQueryHookResult = ReturnType<typeof useGetManualIndexYearlyNtSuspenseQuery>;
export type GetManualIndexYearlyNtQueryResult = Apollo.QueryResult<GetManualIndexYearlyNtQuery, GetManualIndexYearlyNtQueryVariables>;
export function refetchGetManualIndexYearlyNtQuery(variables?: GetManualIndexYearlyNtQueryVariables) {
      return { query: GetManualIndexYearlyNtDocument, variables: variables }
    }
export const GetQuantityDailyTb2Document = gql`
    query GetQuantityDailyTB2($month: Int, $year: Int) {
  GetQuantityDailyTB2(month: $month, year: $year) {
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetQuantityDailyTb2Query__
 *
 * To run a query within a React component, call `useGetQuantityDailyTb2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityDailyTb2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityDailyTb2Query({
 *   variables: {
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetQuantityDailyTb2Query(baseOptions?: Apollo.QueryHookOptions<GetQuantityDailyTb2Query, GetQuantityDailyTb2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityDailyTb2Query, GetQuantityDailyTb2QueryVariables>(GetQuantityDailyTb2Document, options);
      }
export function useGetQuantityDailyTb2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityDailyTb2Query, GetQuantityDailyTb2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityDailyTb2Query, GetQuantityDailyTb2QueryVariables>(GetQuantityDailyTb2Document, options);
        }
export function useGetQuantityDailyTb2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityDailyTb2Query, GetQuantityDailyTb2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityDailyTb2Query, GetQuantityDailyTb2QueryVariables>(GetQuantityDailyTb2Document, options);
        }
export type GetQuantityDailyTb2QueryHookResult = ReturnType<typeof useGetQuantityDailyTb2Query>;
export type GetQuantityDailyTb2LazyQueryHookResult = ReturnType<typeof useGetQuantityDailyTb2LazyQuery>;
export type GetQuantityDailyTb2SuspenseQueryHookResult = ReturnType<typeof useGetQuantityDailyTb2SuspenseQuery>;
export type GetQuantityDailyTb2QueryResult = Apollo.QueryResult<GetQuantityDailyTb2Query, GetQuantityDailyTb2QueryVariables>;
export function refetchGetQuantityDailyTb2Query(variables?: GetQuantityDailyTb2QueryVariables) {
      return { query: GetQuantityDailyTb2Document, variables: variables }
    }
export const GetQuantityMonthlyTb2Document = gql`
    query GetQuantityMonthlyTB2($start: String, $end: String) {
  GetQuantityMonthlyTB2(start: $start, end: $end) {
    AvgValue
    CountDay
    TimeStamp
    Value
    IsEnoughData
    StartDate
    EndDate
  }
}
    `;

/**
 * __useGetQuantityMonthlyTb2Query__
 *
 * To run a query within a React component, call `useGetQuantityMonthlyTb2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityMonthlyTb2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityMonthlyTb2Query({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityMonthlyTb2Query(baseOptions?: Apollo.QueryHookOptions<GetQuantityMonthlyTb2Query, GetQuantityMonthlyTb2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityMonthlyTb2Query, GetQuantityMonthlyTb2QueryVariables>(GetQuantityMonthlyTb2Document, options);
      }
export function useGetQuantityMonthlyTb2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityMonthlyTb2Query, GetQuantityMonthlyTb2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityMonthlyTb2Query, GetQuantityMonthlyTb2QueryVariables>(GetQuantityMonthlyTb2Document, options);
        }
export function useGetQuantityMonthlyTb2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityMonthlyTb2Query, GetQuantityMonthlyTb2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityMonthlyTb2Query, GetQuantityMonthlyTb2QueryVariables>(GetQuantityMonthlyTb2Document, options);
        }
export type GetQuantityMonthlyTb2QueryHookResult = ReturnType<typeof useGetQuantityMonthlyTb2Query>;
export type GetQuantityMonthlyTb2LazyQueryHookResult = ReturnType<typeof useGetQuantityMonthlyTb2LazyQuery>;
export type GetQuantityMonthlyTb2SuspenseQueryHookResult = ReturnType<typeof useGetQuantityMonthlyTb2SuspenseQuery>;
export type GetQuantityMonthlyTb2QueryResult = Apollo.QueryResult<GetQuantityMonthlyTb2Query, GetQuantityMonthlyTb2QueryVariables>;
export function refetchGetQuantityMonthlyTb2Query(variables?: GetQuantityMonthlyTb2QueryVariables) {
      return { query: GetQuantityMonthlyTb2Document, variables: variables }
    }
export const GetQuantityYearlyTb2Document = gql`
    query GetQuantityYearlyTB2($start: String, $end: String) {
  GetQuantityYearlyTB2(start: $start, end: $end) {
    AvgValue
    CountDay
    IsEnoughData
    TimeStamp
    Value
    StartDate
    EndDate
  }
}
    `;

/**
 * __useGetQuantityYearlyTb2Query__
 *
 * To run a query within a React component, call `useGetQuantityYearlyTb2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetQuantityYearlyTb2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuantityYearlyTb2Query({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetQuantityYearlyTb2Query(baseOptions?: Apollo.QueryHookOptions<GetQuantityYearlyTb2Query, GetQuantityYearlyTb2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuantityYearlyTb2Query, GetQuantityYearlyTb2QueryVariables>(GetQuantityYearlyTb2Document, options);
      }
export function useGetQuantityYearlyTb2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuantityYearlyTb2Query, GetQuantityYearlyTb2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuantityYearlyTb2Query, GetQuantityYearlyTb2QueryVariables>(GetQuantityYearlyTb2Document, options);
        }
export function useGetQuantityYearlyTb2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuantityYearlyTb2Query, GetQuantityYearlyTb2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuantityYearlyTb2Query, GetQuantityYearlyTb2QueryVariables>(GetQuantityYearlyTb2Document, options);
        }
export type GetQuantityYearlyTb2QueryHookResult = ReturnType<typeof useGetQuantityYearlyTb2Query>;
export type GetQuantityYearlyTb2LazyQueryHookResult = ReturnType<typeof useGetQuantityYearlyTb2LazyQuery>;
export type GetQuantityYearlyTb2SuspenseQueryHookResult = ReturnType<typeof useGetQuantityYearlyTb2SuspenseQuery>;
export type GetQuantityYearlyTb2QueryResult = Apollo.QueryResult<GetQuantityYearlyTb2Query, GetQuantityYearlyTb2QueryVariables>;
export function refetchGetQuantityYearlyTb2Query(variables?: GetQuantityYearlyTb2QueryVariables) {
      return { query: GetQuantityYearlyTb2Document, variables: variables }
    }
export const GetManualIndexDailyTb2Document = gql`
    query GetManualIndexDailyTB2($month: Int, $year: Int) {
  GetManualIndexDailyTB2(month: $month, year: $year) {
    TimeStamp
    Value
  }
}
    `;

/**
 * __useGetManualIndexDailyTb2Query__
 *
 * To run a query within a React component, call `useGetManualIndexDailyTb2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexDailyTb2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexDailyTb2Query({
 *   variables: {
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetManualIndexDailyTb2Query(baseOptions?: Apollo.QueryHookOptions<GetManualIndexDailyTb2Query, GetManualIndexDailyTb2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexDailyTb2Query, GetManualIndexDailyTb2QueryVariables>(GetManualIndexDailyTb2Document, options);
      }
export function useGetManualIndexDailyTb2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexDailyTb2Query, GetManualIndexDailyTb2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexDailyTb2Query, GetManualIndexDailyTb2QueryVariables>(GetManualIndexDailyTb2Document, options);
        }
export function useGetManualIndexDailyTb2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexDailyTb2Query, GetManualIndexDailyTb2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexDailyTb2Query, GetManualIndexDailyTb2QueryVariables>(GetManualIndexDailyTb2Document, options);
        }
export type GetManualIndexDailyTb2QueryHookResult = ReturnType<typeof useGetManualIndexDailyTb2Query>;
export type GetManualIndexDailyTb2LazyQueryHookResult = ReturnType<typeof useGetManualIndexDailyTb2LazyQuery>;
export type GetManualIndexDailyTb2SuspenseQueryHookResult = ReturnType<typeof useGetManualIndexDailyTb2SuspenseQuery>;
export type GetManualIndexDailyTb2QueryResult = Apollo.QueryResult<GetManualIndexDailyTb2Query, GetManualIndexDailyTb2QueryVariables>;
export function refetchGetManualIndexDailyTb2Query(variables?: GetManualIndexDailyTb2QueryVariables) {
      return { query: GetManualIndexDailyTb2Document, variables: variables }
    }
export const GetManualIndexMonthlyTb2Document = gql`
    query GetManualIndexMonthlyTB2($start: String, $end: String) {
  GetManualIndexMonthlyTB2(start: $start, end: $end) {
    AvgValue
    CountDay
    TimeStamp
    Value
    IsEnoughData
    StartDate
    EndDate
  }
}
    `;

/**
 * __useGetManualIndexMonthlyTb2Query__
 *
 * To run a query within a React component, call `useGetManualIndexMonthlyTb2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexMonthlyTb2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexMonthlyTb2Query({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetManualIndexMonthlyTb2Query(baseOptions?: Apollo.QueryHookOptions<GetManualIndexMonthlyTb2Query, GetManualIndexMonthlyTb2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexMonthlyTb2Query, GetManualIndexMonthlyTb2QueryVariables>(GetManualIndexMonthlyTb2Document, options);
      }
export function useGetManualIndexMonthlyTb2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexMonthlyTb2Query, GetManualIndexMonthlyTb2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexMonthlyTb2Query, GetManualIndexMonthlyTb2QueryVariables>(GetManualIndexMonthlyTb2Document, options);
        }
export function useGetManualIndexMonthlyTb2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexMonthlyTb2Query, GetManualIndexMonthlyTb2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexMonthlyTb2Query, GetManualIndexMonthlyTb2QueryVariables>(GetManualIndexMonthlyTb2Document, options);
        }
export type GetManualIndexMonthlyTb2QueryHookResult = ReturnType<typeof useGetManualIndexMonthlyTb2Query>;
export type GetManualIndexMonthlyTb2LazyQueryHookResult = ReturnType<typeof useGetManualIndexMonthlyTb2LazyQuery>;
export type GetManualIndexMonthlyTb2SuspenseQueryHookResult = ReturnType<typeof useGetManualIndexMonthlyTb2SuspenseQuery>;
export type GetManualIndexMonthlyTb2QueryResult = Apollo.QueryResult<GetManualIndexMonthlyTb2Query, GetManualIndexMonthlyTb2QueryVariables>;
export function refetchGetManualIndexMonthlyTb2Query(variables?: GetManualIndexMonthlyTb2QueryVariables) {
      return { query: GetManualIndexMonthlyTb2Document, variables: variables }
    }
export const GetManualIndexYearlyTb2Document = gql`
    query GetManualIndexYearlyTB2($start: String, $end: String) {
  GetManualIndexYearlyTB2(start: $start, end: $end) {
    AvgValue
    CountDay
    IsEnoughData
    TimeStamp
    Value
    StartDate
    EndDate
  }
}
    `;

/**
 * __useGetManualIndexYearlyTb2Query__
 *
 * To run a query within a React component, call `useGetManualIndexYearlyTb2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetManualIndexYearlyTb2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManualIndexYearlyTb2Query({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetManualIndexYearlyTb2Query(baseOptions?: Apollo.QueryHookOptions<GetManualIndexYearlyTb2Query, GetManualIndexYearlyTb2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManualIndexYearlyTb2Query, GetManualIndexYearlyTb2QueryVariables>(GetManualIndexYearlyTb2Document, options);
      }
export function useGetManualIndexYearlyTb2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManualIndexYearlyTb2Query, GetManualIndexYearlyTb2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManualIndexYearlyTb2Query, GetManualIndexYearlyTb2QueryVariables>(GetManualIndexYearlyTb2Document, options);
        }
export function useGetManualIndexYearlyTb2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManualIndexYearlyTb2Query, GetManualIndexYearlyTb2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManualIndexYearlyTb2Query, GetManualIndexYearlyTb2QueryVariables>(GetManualIndexYearlyTb2Document, options);
        }
export type GetManualIndexYearlyTb2QueryHookResult = ReturnType<typeof useGetManualIndexYearlyTb2Query>;
export type GetManualIndexYearlyTb2LazyQueryHookResult = ReturnType<typeof useGetManualIndexYearlyTb2LazyQuery>;
export type GetManualIndexYearlyTb2SuspenseQueryHookResult = ReturnType<typeof useGetManualIndexYearlyTb2SuspenseQuery>;
export type GetManualIndexYearlyTb2QueryResult = Apollo.QueryResult<GetManualIndexYearlyTb2Query, GetManualIndexYearlyTb2QueryVariables>;
export function refetchGetManualIndexYearlyTb2Query(variables?: GetManualIndexYearlyTb2QueryVariables) {
      return { query: GetManualIndexYearlyTb2Document, variables: variables }
    }
export const GetRolesDocument = gql`
    query GetRoles {
  GetRoles {
    Description
    Role
    _id
  }
}
    `;

/**
 * __useGetRolesQuery__
 *
 * To run a query within a React component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
      }
export function useGetRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export function useGetRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>;
export type GetRolesLazyQueryHookResult = ReturnType<typeof useGetRolesLazyQuery>;
export type GetRolesSuspenseQueryHookResult = ReturnType<typeof useGetRolesSuspenseQuery>;
export type GetRolesQueryResult = Apollo.QueryResult<GetRolesQuery, GetRolesQueryVariables>;
export function refetchGetRolesQuery(variables?: GetRolesQueryVariables) {
      return { query: GetRolesDocument, variables: variables }
    }
export const GetSitesDocument = gql`
    query GetSites {
  GetSites {
    Available
    DisplayGroup
    Latitude
    Location
    LoggerId
    Longitude
    Note
    SiteId
    Status
    Type
    _id
    Prioritize
    IsScadaMeter
    IsManualMeter
    IsShowLabel
    TimeDelay
    IsDNP
    IsHWM
    StartHour
  }
}
    `;

/**
 * __useGetSitesQuery__
 *
 * To run a query within a React component, call `useGetSitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSitesQuery(baseOptions?: Apollo.QueryHookOptions<GetSitesQuery, GetSitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSitesQuery, GetSitesQueryVariables>(GetSitesDocument, options);
      }
export function useGetSitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSitesQuery, GetSitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSitesQuery, GetSitesQueryVariables>(GetSitesDocument, options);
        }
export function useGetSitesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSitesQuery, GetSitesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSitesQuery, GetSitesQueryVariables>(GetSitesDocument, options);
        }
export type GetSitesQueryHookResult = ReturnType<typeof useGetSitesQuery>;
export type GetSitesLazyQueryHookResult = ReturnType<typeof useGetSitesLazyQuery>;
export type GetSitesSuspenseQueryHookResult = ReturnType<typeof useGetSitesSuspenseQuery>;
export type GetSitesQueryResult = Apollo.QueryResult<GetSitesQuery, GetSitesQueryVariables>;
export function refetchGetSitesQuery(variables?: GetSitesQueryVariables) {
      return { query: GetSitesDocument, variables: variables }
    }
export const GetSiteIsMeterDocument = gql`
    query GetSiteIsMeter {
  GetSiteIsMeter {
    Available
    DisplayGroup
    Latitude
    Location
    LoggerId
    Longitude
    Note
    Prioritize
    SiteId
    Status
    Type
    _id
    IsScadaMeter
    IsManualMeter
    IsShowLabel
    TimeDelay
    IsDNP
    IsHWM
    StartHour
  }
}
    `;

/**
 * __useGetSiteIsMeterQuery__
 *
 * To run a query within a React component, call `useGetSiteIsMeterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteIsMeterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteIsMeterQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSiteIsMeterQuery(baseOptions?: Apollo.QueryHookOptions<GetSiteIsMeterQuery, GetSiteIsMeterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteIsMeterQuery, GetSiteIsMeterQueryVariables>(GetSiteIsMeterDocument, options);
      }
export function useGetSiteIsMeterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteIsMeterQuery, GetSiteIsMeterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteIsMeterQuery, GetSiteIsMeterQueryVariables>(GetSiteIsMeterDocument, options);
        }
export function useGetSiteIsMeterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSiteIsMeterQuery, GetSiteIsMeterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSiteIsMeterQuery, GetSiteIsMeterQueryVariables>(GetSiteIsMeterDocument, options);
        }
export type GetSiteIsMeterQueryHookResult = ReturnType<typeof useGetSiteIsMeterQuery>;
export type GetSiteIsMeterLazyQueryHookResult = ReturnType<typeof useGetSiteIsMeterLazyQuery>;
export type GetSiteIsMeterSuspenseQueryHookResult = ReturnType<typeof useGetSiteIsMeterSuspenseQuery>;
export type GetSiteIsMeterQueryResult = Apollo.QueryResult<GetSiteIsMeterQuery, GetSiteIsMeterQueryVariables>;
export function refetchGetSiteIsMeterQuery(variables?: GetSiteIsMeterQueryVariables) {
      return { query: GetSiteIsMeterDocument, variables: variables }
    }
export const GetSiteIsMeterTotalDocument = gql`
    query GetSiteIsMeterTotal {
  GetSiteIsMeterTotal {
    Available
    DisplayGroup
    Latitude
    Location
    LoggerId
    Longitude
    Note
    Prioritize
    SiteId
    Status
    Type
    _id
    IsScadaMeter
    IsManualMeter
    IsShowLabel
    TimeDelay
    IsDNP
    IsHWM
    StartHour
  }
}
    `;

/**
 * __useGetSiteIsMeterTotalQuery__
 *
 * To run a query within a React component, call `useGetSiteIsMeterTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteIsMeterTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteIsMeterTotalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSiteIsMeterTotalQuery(baseOptions?: Apollo.QueryHookOptions<GetSiteIsMeterTotalQuery, GetSiteIsMeterTotalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteIsMeterTotalQuery, GetSiteIsMeterTotalQueryVariables>(GetSiteIsMeterTotalDocument, options);
      }
export function useGetSiteIsMeterTotalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteIsMeterTotalQuery, GetSiteIsMeterTotalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteIsMeterTotalQuery, GetSiteIsMeterTotalQueryVariables>(GetSiteIsMeterTotalDocument, options);
        }
export function useGetSiteIsMeterTotalSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSiteIsMeterTotalQuery, GetSiteIsMeterTotalQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSiteIsMeterTotalQuery, GetSiteIsMeterTotalQueryVariables>(GetSiteIsMeterTotalDocument, options);
        }
export type GetSiteIsMeterTotalQueryHookResult = ReturnType<typeof useGetSiteIsMeterTotalQuery>;
export type GetSiteIsMeterTotalLazyQueryHookResult = ReturnType<typeof useGetSiteIsMeterTotalLazyQuery>;
export type GetSiteIsMeterTotalSuspenseQueryHookResult = ReturnType<typeof useGetSiteIsMeterTotalSuspenseQuery>;
export type GetSiteIsMeterTotalQueryResult = Apollo.QueryResult<GetSiteIsMeterTotalQuery, GetSiteIsMeterTotalQueryVariables>;
export function refetchGetSiteIsMeterTotalQuery(variables?: GetSiteIsMeterTotalQueryVariables) {
      return { query: GetSiteIsMeterTotalDocument, variables: variables }
    }
export const GetSiteIsMeterTotalBranchDocument = gql`
    query GetSiteIsMeterTotalBranch {
  GetSiteIsMeterTotalBranch {
    Available
    DisplayGroup
    Latitude
    Location
    Longitude
    LoggerId
    Prioritize
    Note
    SiteId
    Status
    Type
    _id
    IsScadaMeter
    IsManualMeter
    IsShowLabel
    TimeDelay
    IsDNP
    IsHWM
    StartHour
  }
}
    `;

/**
 * __useGetSiteIsMeterTotalBranchQuery__
 *
 * To run a query within a React component, call `useGetSiteIsMeterTotalBranchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteIsMeterTotalBranchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteIsMeterTotalBranchQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSiteIsMeterTotalBranchQuery(baseOptions?: Apollo.QueryHookOptions<GetSiteIsMeterTotalBranchQuery, GetSiteIsMeterTotalBranchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteIsMeterTotalBranchQuery, GetSiteIsMeterTotalBranchQueryVariables>(GetSiteIsMeterTotalBranchDocument, options);
      }
export function useGetSiteIsMeterTotalBranchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteIsMeterTotalBranchQuery, GetSiteIsMeterTotalBranchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteIsMeterTotalBranchQuery, GetSiteIsMeterTotalBranchQueryVariables>(GetSiteIsMeterTotalBranchDocument, options);
        }
export function useGetSiteIsMeterTotalBranchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSiteIsMeterTotalBranchQuery, GetSiteIsMeterTotalBranchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSiteIsMeterTotalBranchQuery, GetSiteIsMeterTotalBranchQueryVariables>(GetSiteIsMeterTotalBranchDocument, options);
        }
export type GetSiteIsMeterTotalBranchQueryHookResult = ReturnType<typeof useGetSiteIsMeterTotalBranchQuery>;
export type GetSiteIsMeterTotalBranchLazyQueryHookResult = ReturnType<typeof useGetSiteIsMeterTotalBranchLazyQuery>;
export type GetSiteIsMeterTotalBranchSuspenseQueryHookResult = ReturnType<typeof useGetSiteIsMeterTotalBranchSuspenseQuery>;
export type GetSiteIsMeterTotalBranchQueryResult = Apollo.QueryResult<GetSiteIsMeterTotalBranchQuery, GetSiteIsMeterTotalBranchQueryVariables>;
export function refetchGetSiteIsMeterTotalBranchQuery(variables?: GetSiteIsMeterTotalBranchQueryVariables) {
      return { query: GetSiteIsMeterTotalBranchDocument, variables: variables }
    }
export const GetSiteIsManualMeterDocument = gql`
    query GetSiteIsManualMeter {
  GetSiteIsManualMeter {
    Available
    DisplayGroup
    IsManualMeter
    IsScadaMeter
    Latitude
    Location
    LoggerId
    Longitude
    Note
    Prioritize
    SiteId
    Status
    _id
    Type
    IsShowLabel
    TimeDelay
    IsDNP
    IsHWM
    StartHour
  }
}
    `;

/**
 * __useGetSiteIsManualMeterQuery__
 *
 * To run a query within a React component, call `useGetSiteIsManualMeterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteIsManualMeterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteIsManualMeterQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSiteIsManualMeterQuery(baseOptions?: Apollo.QueryHookOptions<GetSiteIsManualMeterQuery, GetSiteIsManualMeterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteIsManualMeterQuery, GetSiteIsManualMeterQueryVariables>(GetSiteIsManualMeterDocument, options);
      }
export function useGetSiteIsManualMeterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteIsManualMeterQuery, GetSiteIsManualMeterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteIsManualMeterQuery, GetSiteIsManualMeterQueryVariables>(GetSiteIsManualMeterDocument, options);
        }
export function useGetSiteIsManualMeterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSiteIsManualMeterQuery, GetSiteIsManualMeterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSiteIsManualMeterQuery, GetSiteIsManualMeterQueryVariables>(GetSiteIsManualMeterDocument, options);
        }
export type GetSiteIsManualMeterQueryHookResult = ReturnType<typeof useGetSiteIsManualMeterQuery>;
export type GetSiteIsManualMeterLazyQueryHookResult = ReturnType<typeof useGetSiteIsManualMeterLazyQuery>;
export type GetSiteIsManualMeterSuspenseQueryHookResult = ReturnType<typeof useGetSiteIsManualMeterSuspenseQuery>;
export type GetSiteIsManualMeterQueryResult = Apollo.QueryResult<GetSiteIsManualMeterQuery, GetSiteIsManualMeterQueryVariables>;
export function refetchGetSiteIsManualMeterQuery(variables?: GetSiteIsManualMeterQueryVariables) {
      return { query: GetSiteIsManualMeterDocument, variables: variables }
    }
export const InsertSiteDocument = gql`
    mutation InsertSite($site: SiteInsertInput) {
  InsertSite(site: $site)
}
    `;
export type InsertSiteMutationFn = Apollo.MutationFunction<InsertSiteMutation, InsertSiteMutationVariables>;

/**
 * __useInsertSiteMutation__
 *
 * To run a mutation, you first call `useInsertSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertSiteMutation, { data, loading, error }] = useInsertSiteMutation({
 *   variables: {
 *      site: // value for 'site'
 *   },
 * });
 */
export function useInsertSiteMutation(baseOptions?: Apollo.MutationHookOptions<InsertSiteMutation, InsertSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertSiteMutation, InsertSiteMutationVariables>(InsertSiteDocument, options);
      }
export type InsertSiteMutationHookResult = ReturnType<typeof useInsertSiteMutation>;
export type InsertSiteMutationResult = Apollo.MutationResult<InsertSiteMutation>;
export type InsertSiteMutationOptions = Apollo.BaseMutationOptions<InsertSiteMutation, InsertSiteMutationVariables>;
export const UpdateSiteDocument = gql`
    mutation UpdateSite($site: SiteUpdateInput) {
  UpdateSite(site: $site)
}
    `;
export type UpdateSiteMutationFn = Apollo.MutationFunction<UpdateSiteMutation, UpdateSiteMutationVariables>;

/**
 * __useUpdateSiteMutation__
 *
 * To run a mutation, you first call `useUpdateSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSiteMutation, { data, loading, error }] = useUpdateSiteMutation({
 *   variables: {
 *      site: // value for 'site'
 *   },
 * });
 */
export function useUpdateSiteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSiteMutation, UpdateSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument, options);
      }
export type UpdateSiteMutationHookResult = ReturnType<typeof useUpdateSiteMutation>;
export type UpdateSiteMutationResult = Apollo.MutationResult<UpdateSiteMutation>;
export type UpdateSiteMutationOptions = Apollo.BaseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables>;
export const DeleteSiteDocument = gql`
    mutation DeleteSite($site: SiteUpdateInput) {
  DeleteSite(site: $site)
}
    `;
export type DeleteSiteMutationFn = Apollo.MutationFunction<DeleteSiteMutation, DeleteSiteMutationVariables>;

/**
 * __useDeleteSiteMutation__
 *
 * To run a mutation, you first call `useDeleteSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSiteMutation, { data, loading, error }] = useDeleteSiteMutation({
 *   variables: {
 *      site: // value for 'site'
 *   },
 * });
 */
export function useDeleteSiteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSiteMutation, DeleteSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSiteMutation, DeleteSiteMutationVariables>(DeleteSiteDocument, options);
      }
export type DeleteSiteMutationHookResult = ReturnType<typeof useDeleteSiteMutation>;
export type DeleteSiteMutationResult = Apollo.MutationResult<DeleteSiteMutation>;
export type DeleteSiteMutationOptions = Apollo.BaseMutationOptions<DeleteSiteMutation, DeleteSiteMutationVariables>;
export const GetSiteAndChannelDocument = gql`
    query GetSiteAndChannel {
  GetSiteAndChannel {
    Available
    Channels {
      BaseMin
      BaseLine
      BaseMax
      ChannelId
      ChannelName
      ForwardFlow
      IndexTimeStamp
      LastIndex
      LastValue
      LoggerId
      OtherChannel
      Pressure1
      Pressure2
      ReverseFlow
      TimeStamp
      Unit
      _id
    }
    DisplayGroup
    Latitude
    Location
    LoggerId
    Longitude
    Note
    Prioritize
    SiteId
    Status
    StatusError
    Type
    _id
    IsScadaMeter
    IsManualMeter
    IsShowLabel
    LengthPipe
    PipeName
    PipeId
    SizePipe
  }
}
    `;

/**
 * __useGetSiteAndChannelQuery__
 *
 * To run a query within a React component, call `useGetSiteAndChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteAndChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteAndChannelQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSiteAndChannelQuery(baseOptions?: Apollo.QueryHookOptions<GetSiteAndChannelQuery, GetSiteAndChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteAndChannelQuery, GetSiteAndChannelQueryVariables>(GetSiteAndChannelDocument, options);
      }
export function useGetSiteAndChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteAndChannelQuery, GetSiteAndChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteAndChannelQuery, GetSiteAndChannelQueryVariables>(GetSiteAndChannelDocument, options);
        }
export function useGetSiteAndChannelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSiteAndChannelQuery, GetSiteAndChannelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSiteAndChannelQuery, GetSiteAndChannelQueryVariables>(GetSiteAndChannelDocument, options);
        }
export type GetSiteAndChannelQueryHookResult = ReturnType<typeof useGetSiteAndChannelQuery>;
export type GetSiteAndChannelLazyQueryHookResult = ReturnType<typeof useGetSiteAndChannelLazyQuery>;
export type GetSiteAndChannelSuspenseQueryHookResult = ReturnType<typeof useGetSiteAndChannelSuspenseQuery>;
export type GetSiteAndChannelQueryResult = Apollo.QueryResult<GetSiteAndChannelQuery, GetSiteAndChannelQueryVariables>;
export function refetchGetSiteAndChannelQuery(variables?: GetSiteAndChannelQueryVariables) {
      return { query: GetSiteAndChannelDocument, variables: variables }
    }
export const GetDataQuantityAndIndexManualDocument = gql`
    query GetDataQuantityAndIndexManual($time: String) {
  GetDataQuantityAndIndexManual(time: $time) {
    IdManualIndex
    IndexManual
    Location
    Quantity
    SiteId
  }
}
    `;

/**
 * __useGetDataQuantityAndIndexManualQuery__
 *
 * To run a query within a React component, call `useGetDataQuantityAndIndexManualQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataQuantityAndIndexManualQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataQuantityAndIndexManualQuery({
 *   variables: {
 *      time: // value for 'time'
 *   },
 * });
 */
export function useGetDataQuantityAndIndexManualQuery(baseOptions?: Apollo.QueryHookOptions<GetDataQuantityAndIndexManualQuery, GetDataQuantityAndIndexManualQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataQuantityAndIndexManualQuery, GetDataQuantityAndIndexManualQueryVariables>(GetDataQuantityAndIndexManualDocument, options);
      }
export function useGetDataQuantityAndIndexManualLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataQuantityAndIndexManualQuery, GetDataQuantityAndIndexManualQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataQuantityAndIndexManualQuery, GetDataQuantityAndIndexManualQueryVariables>(GetDataQuantityAndIndexManualDocument, options);
        }
export function useGetDataQuantityAndIndexManualSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataQuantityAndIndexManualQuery, GetDataQuantityAndIndexManualQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataQuantityAndIndexManualQuery, GetDataQuantityAndIndexManualQueryVariables>(GetDataQuantityAndIndexManualDocument, options);
        }
export type GetDataQuantityAndIndexManualQueryHookResult = ReturnType<typeof useGetDataQuantityAndIndexManualQuery>;
export type GetDataQuantityAndIndexManualLazyQueryHookResult = ReturnType<typeof useGetDataQuantityAndIndexManualLazyQuery>;
export type GetDataQuantityAndIndexManualSuspenseQueryHookResult = ReturnType<typeof useGetDataQuantityAndIndexManualSuspenseQuery>;
export type GetDataQuantityAndIndexManualQueryResult = Apollo.QueryResult<GetDataQuantityAndIndexManualQuery, GetDataQuantityAndIndexManualQueryVariables>;
export function refetchGetDataQuantityAndIndexManualQuery(variables?: GetDataQuantityAndIndexManualQueryVariables) {
      return { query: GetDataQuantityAndIndexManualDocument, variables: variables }
    }
export const GetUsersDocument = gql`
    query GetUsers {
  GetUsers {
    Active
    ConsumerId
    Ip
    Email
    Language
    LoginTime
    Password
    Role
    Salt
    StaffId
    TimeStamp
    Username
    _id
    pfm
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
      return { query: GetUsersDocument, variables: variables }
    }
export const GetUserByUsernameDocument = gql`
    query GetUserByUsername($username: String) {
  GetUserByUsername(Username: $username) {
    Active
    ConsumerId
    Email
    Ip
    Language
    LoginTime
    Password
    Role
    Salt
    StaffId
    TimeStamp
    Username
    _id
    pfm
  }
}
    `;

/**
 * __useGetUserByUsernameQuery__
 *
 * To run a query within a React component, call `useGetUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserByUsernameQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, options);
      }
export function useGetUserByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, options);
        }
export function useGetUserByUsernameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, options);
        }
export type GetUserByUsernameQueryHookResult = ReturnType<typeof useGetUserByUsernameQuery>;
export type GetUserByUsernameLazyQueryHookResult = ReturnType<typeof useGetUserByUsernameLazyQuery>;
export type GetUserByUsernameSuspenseQueryHookResult = ReturnType<typeof useGetUserByUsernameSuspenseQuery>;
export type GetUserByUsernameQueryResult = Apollo.QueryResult<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>;
export function refetchGetUserByUsernameQuery(variables?: GetUserByUsernameQueryVariables) {
      return { query: GetUserByUsernameDocument, variables: variables }
    }
export const VerifyPasswordDocument = gql`
    query VerifyPassword($username: String, $password: String) {
  VerifyPassword(Username: $username, Password: $password)
}
    `;

/**
 * __useVerifyPasswordQuery__
 *
 * To run a query within a React component, call `useVerifyPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyPasswordQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useVerifyPasswordQuery(baseOptions?: Apollo.QueryHookOptions<VerifyPasswordQuery, VerifyPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyPasswordQuery, VerifyPasswordQueryVariables>(VerifyPasswordDocument, options);
      }
export function useVerifyPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyPasswordQuery, VerifyPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyPasswordQuery, VerifyPasswordQueryVariables>(VerifyPasswordDocument, options);
        }
export function useVerifyPasswordSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VerifyPasswordQuery, VerifyPasswordQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VerifyPasswordQuery, VerifyPasswordQueryVariables>(VerifyPasswordDocument, options);
        }
export type VerifyPasswordQueryHookResult = ReturnType<typeof useVerifyPasswordQuery>;
export type VerifyPasswordLazyQueryHookResult = ReturnType<typeof useVerifyPasswordLazyQuery>;
export type VerifyPasswordSuspenseQueryHookResult = ReturnType<typeof useVerifyPasswordSuspenseQuery>;
export type VerifyPasswordQueryResult = Apollo.QueryResult<VerifyPasswordQuery, VerifyPasswordQueryVariables>;
export function refetchVerifyPasswordQuery(variables?: VerifyPasswordQueryVariables) {
      return { query: VerifyPasswordDocument, variables: variables }
    }
export const InsertUserDocument = gql`
    mutation InsertUser($user: UserInsertInput) {
  InsertUser(user: $user)
}
    `;
export type InsertUserMutationFn = Apollo.MutationFunction<InsertUserMutation, InsertUserMutationVariables>;

/**
 * __useInsertUserMutation__
 *
 * To run a mutation, you first call `useInsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserMutation, { data, loading, error }] = useInsertUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useInsertUserMutation(baseOptions?: Apollo.MutationHookOptions<InsertUserMutation, InsertUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertUserMutation, InsertUserMutationVariables>(InsertUserDocument, options);
      }
export type InsertUserMutationHookResult = ReturnType<typeof useInsertUserMutation>;
export type InsertUserMutationResult = Apollo.MutationResult<InsertUserMutation>;
export type InsertUserMutationOptions = Apollo.BaseMutationOptions<InsertUserMutation, InsertUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($user: UserUpdateInput) {
  UpdateUser(user: $user)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($user: UserUpdateInput) {
  DeleteUser(user: $user)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;