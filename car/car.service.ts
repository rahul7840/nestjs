import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreatCarDto } from './dto/creat-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './schema/car.schema';
import { Model } from 'mongoose';
import { listcardto } from './dto/car-list.dto';
import { error } from 'console';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  //-----------------------------------------getall----------------------------------------
  async getCar() {
    return await this.carModel.find();
  }
  //-------------------------------------getcarlist----------------------------------------
  async getCarlist(listcardto: listcardto) {
    try {
      let { pageno, limit } = listcardto;

      let skip = limit * (pageno - 1);

      const final = await this.carModel.find().skip(skip).limit(limit).lean();

      //   if (!final || !Array.isArray(final) || final.length === 0) {
      //     throw new Error('No cars found');
      //   }

      const count = await this.carModel.countDocuments();
      return { data: final, count };
    } catch (error) {
      throw new Error(`Failed to fetch cat list: ${error}`);
    }
  }
  //------------------------------------creat ticket---------------------------------------

  async postcar(creatcardto: CreatCarDto) {
    const carexist = await this.carModel.findOne({
      companyname: creatcardto.companyname,
      modelnumber: creatcardto.modelnumber,
    });
    if (carexist) {
      return { message: 'We allready have your vechile details' };
    }
    const creatcar = new this.carModel(creatcardto);
    return await creatcar.save();
  }

  //------------------------------------Delete ticket---------------------------------------

  // async removecar(id: any): Promise<string> {
  //   try {
  //     const deleteResult = await this.carModel.deleteOne({ _id: id });
  //     if (deleteResult.deletedCount === 1) {
  //       return `Car details has been deleted.`;
  //     } else {
  //       return `No vehicle found with the ID ${id}`;
  //     }
  //   } catch (error) {
  //     throw new Error(`Failed to remove vehicle details: ${error.message}`);
  //   }
  // }
  async removecar(id: string): Promise<string> {
    try {
      const updatedCar = await this.carModel.findByIdAndUpdate(
        id,
        { deleted: true },
        { new: true },
      );
      if (!updatedCar) {
        throw new NotFoundException(`Car with ID ${id} not found`);
      }
      return `Car with ID ${id} has been soft-deleted.`;
    } catch (error) {
      throw new Error(
        `Failed to soft-delete car with ID ${id}: ${error.message}`,
      );
    }
  }

  //------------------------------------update ticket---------------------------------------

  async updatecar(id: string, data: CreatCarDto): Promise<Car> {
    const car = await this.carModel.findById(id).exec();

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    // Check for self-exist
    if (
      car.companyname === data.companyname &&
      car.modelnumber === data.modelnumber &&
      car.year === data.year
    ) {
      throw new BadRequestException(`Car details already exist`);
    }

    // Check for duplication
    const duplicate = await this.carModel
      .findOne({
        companyname: data.companyname,
        modelnumber: data.modelnumber,
        year: data.year,
      })
      .exec();

    if (duplicate && duplicate.id != id) {
      throw new BadRequestException(`Car details already exist`);
    }

    const updatedCar = await this.carModel.findByIdAndUpdate(id, data);

    if (!updatedCar) {
      throw new NotFoundException(`Car details not found`);
    }

    return updatedCar;
  }
}
