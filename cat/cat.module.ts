import { Module } from "@nestjs/common";
import { CatService } from "./cat.service";
import { CatController } from "./cat.controller";
import { Cat } from "./entities/cat.entity";
import { CatSchema } from "./schema/cat.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {}
