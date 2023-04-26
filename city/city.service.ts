import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './schema/city.schema';
import { Mode } from 'fs';
import { Model } from 'mongoose';
import { CityListDto } from './dto/citrylist.dto';
import { Country } from 'src/country/schema/contry.schema';
import { query } from 'express';
import { AddCityDto } from './dto/addcity.dto';
import { DeleteStatusDto } from './dto/delete.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<City>,
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  // ------------------------------------get-all-country--------------------------------------
  async getallcity() {
    return await this.cityModel.find();
  }
  // ------------------------------------get-City-List----------------------------------------

  async getcitylist(citylistto: CityListDto) {
    try {
      let { pageno, limit, isActive, isDeleted, countryID } = citylistto;

      let isReallyActive: any = isActive;
      let isReallyDeleted: any = isDeleted;

      if (typeof limit === 'string') limit = parseInt(limit);

      if (typeof pageno === 'string') pageno = parseInt(pageno);

      let query = {};

      query['countryID'] = countryID;

      if (pageno <= 0) {
        pageno = 1;
      }

      let skip = limit * (pageno - 1);

      if (isActive) {
        query['isActive'] = isReallyActive === 'true';
      }

      if (isDeleted) {
        query['isDeleted'] = isReallyDeleted === 'true';
      }

      const final = await this.cityModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .lean();
      const count = await this.cityModel.countDocuments();
      return { data: final, count };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  // ------------------------------------add-City----------------------------------------

  async addcity(addcitydto: AddCityDto) {
    try {
      const { cityname, countryID, isActive } = addcitydto;

      //   const cityExists = await this.cityModel.findOne({
      //     // $and: [{ cityName: cityname }, { countryID: { $ne: countryID } }],

      //   });
      const cityExists = await this.cityModel.findOne({
        cityName: cityname,
      });

      if (!cityExists) {
        return { message: 'City already exists in another country' };
      }

      const countryExists = await this.countryModel.findById(countryID);

      if (!countryExists) {
        return { message: 'Invalid country ID' };
      }

      const result = await this.cityModel.create({
        cityname,
        countryID,
        isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (!result) {
        return { message: 'Something went wrong! Unable to save data' };
      } else {
        return { message: 'Insert successful' };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // ------------------------------------update-City----------------------------------------

  async updatecity(id: string, data: AddCityDto) {
    try {
      const { cityname, countryID, isActive } = data;

      const existCity = await this.cityModel.findById(id);
      if (!existCity) {
        return { message: `City not found` };
      }
      const existingCountry = await this.countryModel.findOne(
        { _id: countryID },
        // { _id: 1 }
      );
      if (!existingCountry) {
        return { mesaage: '<Country-id> INVALID!' };

        // const existingCount = await this.cityModel.count({
        //     _id: { $ne: _id },
        //     cityname,
        //     countryID
        //   });
      }
      const duplicate = await this.cityModel.findOne({
        cityname,
        _id: { $ne: id },
      });
      if (duplicate) {
        return { message: ` City already exists` };
      }
      // Update the country
      existCity.cityname = cityname;
      existCity.countryID = countryID;
      existCity.isActive = isActive;
      existCity.updatedAt = new Date();

      const updatedCity = await existCity.save();
      if (!updatedCity) {
        return { message: `City details not found` };
      }
      return { message: 'Update Success' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  // ------------------------------------Soft-Delete----------------------------------------

  async deletecity(id: string, deleteStatus: DeleteStatusDto) {
    const city = await this.cityModel.findById(id);
    if (!city) {
      return { message: 'ID not exists' };
    }
    const { status } = deleteStatus;

    const updateStatus = await this.cityModel.findByIdAndUpdate(id, {
      $set: { isDeleted: status, updatedAt: new Date() },
    });
    if (!updateStatus) {
      return { message: 'Failed to Delete' };
    }
    return { message: `Deletion successful` };
  }
  catch() {
    throw new InternalServerErrorException();
  }
}
