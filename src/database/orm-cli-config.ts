import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCousesTable1701560290781 } from "src/migrations/1701560290781-CreateCousesTable";
import { CreateTagsTable1701563938072 } from "src/migrations/1701563938072-CreateTagsTable";
import { CreateCousesTagsTable1701564982348 } from "src/migrations/1701564982348-CreateCousesTagsTable";
import { AddsCoursesIdToCoursesTagsTable1701566152790 } from "src/migrations/1701566152790-AddsCoursesIdToCoursesTagsTable";
import { AddsTagsIdToCoursesTagsTable1701567171966 } from "src/migrations/1701567171966-AddsTagsIdToCoursesTagsTable";

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCousesTable1701560290781, 
    CreateTagsTable1701563938072,
    CreateCousesTagsTable1701564982348,
    AddsCoursesIdToCoursesTagsTable1701566152790,
    AddsTagsIdToCoursesTagsTable1701567171966
  ]
})