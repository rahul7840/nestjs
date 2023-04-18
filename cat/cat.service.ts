import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./entities/cat.entity";
// import { CatDocument } from "./schema/cat.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll() {
    return await this.catModel.find();
  }

  async findOne(origin: string) {
    return await this.catModel.findOne({ origin });
  }

  async update(name: string, updateCatDto: UpdateCatDto) {
    return await this.catModel.updateOne(
      { name },
      { $set: { ...updateCatDto } }
    );
  }

  async remove(origin: string) {
    return await this.catModel.deleteOne({ origin });
  }
}
