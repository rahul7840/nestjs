import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { v4 as uuidv4 } from 'uuid';
  import { CSAT } from 'src/schemas/csat.schema';
  import { User } from 'src/schemas/user/user.schema';
  import { InjectDb } from 'src/db-provider/mongo.decorators';
  import { BaseService } from 'src/helper/base.service';
  import { ChangeStatusDto } from '../dto/change-status.dto';
  import * as CONSTANTS from 'src/helper/constant';
  
  import {
    Activity,
    ActivityLogInterface,
  } from 'src/utility/activity-logger.utility';
  import { createGroup, creatgrpDTO, CreatHolidayDto, HolidayDto, ListHolidayDto, UpdateHolidayDto } from './dto';
  import { Country } from 'src/schemas/country.schema';
  import { CoreListDto } from 'src/helper/core-dto';
  import { Generic } from 'src/utility/generic.utility';
  import { Holiday } from 'src/schemas/holiday.schema';
  import { HolidayGroup, HolidayGroupDocument } from 'src/schemas/holiday-group.schema';
  import { assetsUrl } from 'src/config/internal-links.config';
  import { Role } from 'src/enum/roles.enum';
  import {
    ImportModuleNameEnum,
    ImportSubTypesEnum,
  } from 'src/enum/import-moduleName.enum';
  import { escapeRegExp } from 'src/utility/regex.utility';
  import { find } from 'rxjs';
  import { Group } from 'src/schemas/group.schema';
  import { Groupp } from './grp.schema';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, Types } from 'mongoose';
  import { group } from 'console';
  
  @Injectable()
  export class AppService extends BaseService {
    private serviceModel;
    // private ModuleName = "SIP Endpoint";
    groupModel;
  
    private ModuleName = CONSTANTS.MODULES.HOLIDAY;
    constructor(@InjectDb('Connection2') private readonly db) {
      super();
      this.serviceModel = this.db.collection(CONSTANTS.COLLECTION.HOLIDAY);
      this.groupModel = this.db.collection(CONSTANTS.COLLECTION.HOLIDAYGROUP);
      this.updateData({
        modal: this.serviceModel,
        moduleName: this.ModuleName,
        collectionName: CONSTANTS.COLLECTION.HOLIDAY,
        db: this.db,
      });
    }
  
    // async import(files, user: User, tenantId) {
    //   var count = 0;
    //   const unsuccessRecord = new Array();
    //   const array = await Generic.CsvToJson(files[0].path);
    //   let successInp = [];
  
    //   for (let index = 0; index < array.length; index++) {
    //     var row = array[index];
    //     if (row) {
    //       var error_message = {};
    //       if (row?.name && row?.iso3 && row?.iso2 && row?.phone_code) {
    //         let dublicate = await this.serviceModel.findOne({
    //           name: row?.name,
    //           isDeleted: false,
    //         });
  
    //         let obj = new Country();
  
    //         if (row.name) obj.name = row.name;
    //         if (row.iso3) obj.iso3 = row.iso3;
    //         if (row.iso2) obj.iso2 = row.iso2;
    //         if (row.numeric_code) obj.numeric_code = row.numeric_code;
    //         if (row.phone_code) obj.phone_code = row.phone_code;
    //         if (row.capital) obj.capital = row.capital;
    //         if (row.currency) obj.currency = row.currency;
    //         if (row.currency_symbol) obj.currency_symbol = row.currency_symbol;
    //         if (row.native) obj.native = row.native;
    //         if (row.region) obj.region = row.region;
    //         if (row.subregion) obj.subregion = row.subregion;
    //         if (row.timezones) obj.timezones = row.timezones;
    //         if (row.latitude) obj.latitude = row.latitude;
    //         if (row.longitude) obj.longitude = row.longitude;
    //         if (row.emoji) obj.emoji = row.emoji;
    //         if (row.emojiU) obj.emojiU = row.emojiU;
  
    //         if (dublicate) {
    //           obj.update_at = new Date();
    //           obj.updateBy = user._id;
  
    //           await this.serviceModel.findOneAndUpdate(
    //             { _id: dublicate._id },
    //             { $set: obj },
    //             {
    //               new: true,
    //             },
    //           );
    //         } else {
    //           obj.create_at = new Date();
    //           obj.createBy = user._id;
    //           obj.isDeleted = false;
    //           obj.status = true;
    //           obj.tags = [];
    //           successInp.push(obj);
    //         }
  
    //         count++;
    //       } else if (row != {}) {
    //         if (!row.phone_number)
    //           error_message['phone_number'] = `Phone number field require.`;
  
    //         if (!row.provider_id)
    //           error_message['provider_id'] = `Provider id field require.`;
  
    //         if (!row.sendToType)
    //           error_message['sendToType'] = `Send to type field require.`;
  
    //         if (!row.sendTo)
    //           error_message['sendTo'] = `Send to field field require.`;
    //       }
  
    //       if (Object.keys(error_message).length) {
    //         row.error_message = error_message;
    //         unsuccessRecord.push(row);
    //       }
    //     }
    //   }
    //   let op;
    //   if (successInp.length) {
    //     op = await this.serviceModel.insertMany(successInp);
    //   }
  
    //   let activityLog = new ActivityLogInterface();
    //   activityLog.Opration = 'Import';
    //   activityLog.action = 'save';
    //   //activityLog.previous = group;
    //   activityLog.current = successInp;
    //   activityLog.moduleName = this.ModuleName;
    //   activityLog.note = 'Csv uploaded';
    //   activityLog.userId = user._id;
    //activityLog.user_name = user.name || user.email;
    //   Activity.InternalActivity(tenantId, activityLog);
  
    //   return {
    //     importCount: count,
    //     unsuccessRecord: unsuccessRecord,
    //     acknowledged: op?.acknowledged || false,
    //     insertedCount: op?.insertedCount || 0,
    //   };
    // }
  
  
    //   async getGroupsNew(types) {
    //   if (typeof types === 'string') {
    //     types = types.split(',');
    //   }
  
    //   let tagIds = [];
    //   if (types && types.length > 0) {
    //     for (const groupId of types) {
    //       // Find the group by ID or skip adding it to the array if it doesn't exist
    //       const group = await this.groupModel.findOne({ _id: groupId });
    //       if (group) {
    //         tagIds.push(group._id);
    //       }
    //     }
    //   }
    //   return tagIds;
    // }
  
  
    // async groupList() {
    //   return await this.groupModel.find({isDeleted:{$ne:true}}).toArray();
    // }
  
    //---------------creat--grp------
  
    async getGroups(types) {
      if (typeof types == 'string') {
        types = types.split(',');
      }
      let tagIds = [];
      if (types && types?.length > 0) {
        // let type = await this.groupModel.find({ name: { $in: types } }).toArray();
        let type = await this.groupModel.find({ _id: { $in: types } }).toArray();
        for (let index = 0; index < types.length; index++) {
          const tagName = types[index];
  
          let obj = type.find((o) => o.name == tagName);
  
          if (obj) {
            tagIds.push(obj._id);
          } else {
            let newTag = new HolidayGroup();
            newTag._id = uuidv4();
            newTag.name = tagName;
  
            const newModel = await this.groupModel.insertOne(newTag);
            tagIds.push(newTag._id);
          }
        }
      }
  
      return tagIds;
    }
  
  
  
  
    //---------------creat-Group-----------------------------------------------
  
    async createGroup(DTO: creatgrpDTO) {
      try {
        const { name } = DTO
  
  
  
        const duplicate = await this.groupModel.findOne({
          name: name.trim().toLowerCase(),
          isDeleted: { $ne: true }
        });
  
        if (duplicate) {
          return { message: 'We already have a holiday group with the same name' };
        }
  
        // const createGRP = new Groupp();
        const createGRP = new HolidayGroup();
        createGRP._id = uuidv4();
        createGRP.name = name.trim().toLowerCase();;
  
  
        console.log("------------createGRP--------------->", createGRP)
  
        const result = await this.groupModel.insertOne(createGRP)
        if (!result) {
          throw new BadRequestException('not inserted something went wrong!')
        }
        return { message: 'Inserted successfully!' };
  
      } catch (error) {
        throw new BadRequestException(error);
      }
  
    }
  
    async listGroup(paginationOption: CoreListDto) {
      let { search, limit, page_no, order, orderBy } = paginationOption;
  
      let query = { isDeleted: { $ne: true } };
  
      if (search) {
        const regex = new RegExp(escapeRegExp(search)); // i for case insensitive
        query['$or'] = [
          { name: { $regex: regex, $options: 'i' } },
        ];
      }
  
      if (typeof limit == 'string') {
        limit = parseInt(limit);
      }
  
      if (typeof page_no == 'string') {
        page_no = parseInt(page_no);
      }
  
      let sort = {};
      if (orderBy || order) sort[`${orderBy}`] = order == 'DESC' ? -1 : 1;
      else {
        sort['create_at'] = -1;
      }
  
      const data = await this.groupModel
        .find(query)
        .skip((page_no - 1) * limit)
        .limit(limit)
        .sort(sort)
        .toArray();
  
      const count = await this.groupModel.countDocuments(query);
  
      return { data, count };
    }
  
    async updateGroup(id: string, DTO: creatgrpDTO) {
      try {
        const { name } = DTO;
  
        const findID = await this.groupModel.findOne({ _id: id });
        if (!findID) {
          throw new BadRequestException('ID not valid');
        }
  
        // Case-insensitive query for duplicate group names
        const duplicate = await this.groupModel.findOne({ _id: { $ne: id }, name: { $regex: new RegExp(`^${name}$`, 'i') } });
  
        if (duplicate) {
          throw new BadRequestException('Group name already exists');
        }
  
        const updateData: any = {};
        if (name) updateData.name = name.trim().toLocaleLowerCase();
  
        console.log("------------updateData - GRP - holiday-------------->", updateData);
  
        const updatedResult = await this.groupModel.findOneAndUpdate(
          { _id: id },
          { $set: updateData },
          { new: true }
        );
  
        if (!updatedResult) {
          throw new BadRequestException('Unable to update');
        }
  
        return { message: 'Update successfully' };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    async deleteGroup(id) {
      // if group deleted then associated holiday will ALSO DELETED
      try {
        // Find the group to be deleted
        const findId = await this.groupModel.findOne({
          _id: id
        });
  
        if (!findId) {
          throw new BadRequestException('id not valid');
        }
  
        // Find all holidays associated with the group
  
        const associatedHolidaysCursor = await this.serviceModel.find({ group: id });
        const associatedHolidays = await associatedHolidaysCursor.toArray();
  
        console.log("-----------associateHoliday------------>", associatedHolidays)
  
        // delete associated holidays
        if (associatedHolidays && associatedHolidays.length > 0) {
          for (const holiday of associatedHolidays) {
            await this.serviceModel.findOneAndUpdate({ _id: holiday._id }, { $set: { isDeleted: true } });
            console.log("Updated holiday:--------> ", holiday);
          }
        }
  
        const updateObj = {
          update_at: new Date(),
          isDeleted: true
        };
        console.log("-----------updateObj------------>", updateObj)
  
        const softDel = await this.groupModel.findOneAndUpdate(
          { _id: id },
          { $set: updateObj }
        );
        console.log("-----------softDel------------>", softDel)
  
        if (!softDel) {
          throw new BadRequestException("unable to delete");
        }
  
        return { message: 'Group and associate holidays deleted successfully!' };
  
      } catch (error) {
        console.error("Error in removeGroupLatest:", error);
        throw new BadRequestException("Error occurred while deleting group and holidays");
      }
  
    }
  
    async import(files, user: User, tenantId) {
      var count = 0;
      const unsuccessRecord = new Array();
  
      // const array = await Generic.CsvToJson(files[0].path);
      const csv = require('csvtojson');
      const array = await csv().fromFile('./' + files[0].path);
  
  
      let inputs = {};
  
      let rates: any = {};
  
      let keys = [];
  
      let nameDisplayLog = [];
      let op;
      if (!array.length) throw new BadRequestException('Invalid or empty input array')
  
      for (let index = 0; index < array.length; index++) {
        var row = array[index];
  
        if (row) {
          var error_message = {};
  
          if (
            row?.name &&
            row?.start_date &&
            row?.end_date &&
            !keys.includes(row?.name)
          ) {
            keys.push(row?.name);
  
            try {
              const obj = new Holiday();
              obj._id = uuidv4();
              obj.name = row?.name;
              obj.assetsUrl = row?.soundUrl;
              obj.startDate = new Date(row?.start_date);
              // obj.endDate = new Date(row?.end_date);
              obj.endDate = new Date(row?.endDate);
              obj.createBy = user._id;
              obj.create_at = new Date();
              obj.tags = [];
              obj.isDeleted = false;
              obj.status = true;
              obj.group = row?.group ? await this.getGroups(row?.group) : [];
              inputs[row?.name] = obj;
              count++;
            } catch (e) {
              error_message['internalServer'] = e;
            }
          } else {
            if (!row?.name) {
              error_message['name'] = `holiday name require`;
            }
  
            if (keys.includes(row?.name)) {
              error_message['name'] = `holiday name conflicted`;
            }
  
            if (!row?.start_date) {
              error_message['name'] = `start date require`;
            }
  
            if (!row?.end_date) {
              error_message['name'] = `end_date require`;
            }
          }
  
          if (Object.keys(error_message).length) {
            row.error_message = error_message;
            unsuccessRecord.push(row);
          }
        }
      }
  
      if (keys.length) {
        let conflicts = await this.serviceModel
          .find(
            {
              name: { $in: [...keys] },
              isDeleted: false,
            },
            { _id: 1, name: 1 },
          )
          .toArray();
  
        if (conflicts.length) {
          for await (const { _id, name } of conflicts) {
            unsuccessRecord.push({
              ...inputs[name],
              error_message: { name: `name conflicted` },
            });
            delete inputs[name];
          }
        }
        let reqValue = Object.values(inputs);
        if (reqValue?.length) {
          let requests = [];
  
          for await (const iterator of reqValue) {
            let cv: any = iterator;
  
            requests.push({
              updateOne: {
                filter: { _id: cv?._id },
                update: { $set: iterator },
                upsert: true,
                multi: true,
                //collation: CONSTANTS.COLLECTION.PAUSE,
              },
            });
          }
  
          console.log('[update] :::-', JSON.stringify(requests));
  
          op = await this.serviceModel.bulkWrite(requests);
          for (const item of requests) {
            nameDisplayLog.push(item.name)
          }
          let activityLog = new ActivityLogInterface();
          activityLog.Opration = 'Import';
          activityLog.action = 'save';
          //activityLog.previous = count;
          activityLog.current = { ...inputs, name: nameDisplayLog };
          activityLog.moduleName = this.ModuleName;
          activityLog.note = 'Object inserted at import';
          activityLog.userId = user._id;
          activityLog.user_name = user.name || user.email;
          Activity.InternalActivity(tenantId, activityLog);
        }
      }
  
      let taskId = uuidv4();
  
      let path = `/tags/`;
      let obj: any = {
        tenantId,
        fileName: files[0]?.filename,
        reqTime: new Date(),
        processLog: {
          importCount: count,
          unsuccessRecord: unsuccessRecord,
          unsuccessCount: unsuccessRecord.length,
          output: op,
          totalDocCount: array.length,
        },
        req: {},
        taskId: taskId,
        fileurl: assetsUrl + path + files[0]?.filename,
        csvfileName: files[0]?.filename,
        user: user,
        totalDocCount: array.length,
      };
  
      await this.filestatus(
        taskId,
        taskId,
        obj,
        ImportModuleNameEnum.holiday,
        ImportSubTypesEnum.Import,
        'done',
        tenantId,
      );
  
      return {
        importCount: count,
        unsuccessRecord: unsuccessRecord,
        output: op,
      };
    }
  
    //---------------creat-holiday-----------------------------------------------
  
    async list(user: User, paginationOption: ListHolidayDto) {
      const { search, group_id } = paginationOption;
  
      let query = { isDeleted: { $ne: true } };
  
      if (group_id) {
        query['group'] = { $in: [group_id] };
      }
  
      if (search) {
        const regex = new RegExp(escapeRegExp(search)); // i for case insensitive
        query['$or'] = [
          { name: { $regex: regex, $options: 'i' } },
          { tags: { $in: [regex] } },
        ];
      }
  
      if (user.role == Role.TEAMLEAD) {
        let TeamData = await this.getTeamData(user);
        query['team'] = { $in: TeamData.teamIds };
      }
  
      if (user.role == Role.OTHER) {
        query['createBy'] = user._id;
      }
  
      return await this.listWithPagination(
        paginationOption,
        query,
        [
          {
            $lookup: {
              from: CONSTANTS.COLLECTION.HOLIDAYGROUP, // collection name in db
              localField: 'group_id',
              foreignField: '_id',
              as: 'Holiday-group',
            },
          },
        ],
        {},
        false,
      );
    }
  
    async add(holiDTO: HolidayDto, files, user: User, tenantId) {
      try {
        const { name, start_date, end_date, group_id } = holiDTO;
  
        // Check if the provided group exists in the database
        let groupID;
  
        if (group_id) {
          const existingGroup = await this.groupModel.findOne({ _id: group_id });
          if (!existingGroup) {
            throw new BadRequestException('Group not found, Invalid Group');
          }
          groupID = existingGroup._id;
        }
  
        // Case-insensitive query for duplicate group names
  
        const duplicat = await this.serviceModel.findOne({
          name: { $regex: new RegExp(`^${name}$`, 'i') },
          isDeleted: { $ne: true },
        });
  
        if (duplicat) {
          return { message: 'We already have a holiday with the same name.' };
        }
  
        const existingHoliday = await this.serviceModel.findOne({
          startDate: { $lte: new Date(end_date) },
          endDate: { $gte: new Date(start_date) },
          isDeleted: { $ne: true },
        });
        if (existingHoliday) {
          return { message: 'There is already a holiday within this date range.' };
        }
  
  
        const holidayObj = new Holiday();
        holidayObj._id = uuidv4();
        holidayObj.name = name.trim().toLocaleLowerCase();
        holidayObj.assetsUrl = files?.file?.length
          ? assetsUrl + 'sounds/' + files.file[0].filename
          : '';
        holidayObj.startDate = new Date(start_date);
        holidayObj.endDate = new Date(end_date);
        holidayObj.create_at = new Date();
        holidayObj.isDeleted = false;
        holidayObj.group = groupID;
  
        console.log("-----------created group----->", holidayObj);
  
        const result = await this.serviceModel.insertOne(holidayObj);
        if (!result) {
          throw new BadRequestException('Not inserted, something went wrong!');
        }
  
        let activityLog = new ActivityLogInterface();
        activityLog.Opration = 'Create';
        activityLog.action = 'save';
        activityLog.current = { ...holidayObj, name: holidayObj.name };
        activityLog.moduleName = this.ModuleName;
        activityLog.note = 'Object Save';
        activityLog.userId = user._id;
        activityLog.user_name = user.name || user.email;
        Activity.InternalActivity(tenantId, activityLog);
        return { message: 'Inserted successfullyy!' };
      } catch (error) {
        return { error: error.message || error };
      }
    }
  
    async update(id: string, updateDTO: UpdateHolidayDto, files, user: User, tenantId) {
      try {
        const { name, start_date, end_date } = updateDTO;
  
        const findID = await this.serviceModel.findOne({ _id: id });
        if (!findID) {
          throw new BadRequestException("ID not exist");
        }
  
        const duplicatName = await this.serviceModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, _id: { $ne: id } });
        if (duplicatName) {
          throw new BadRequestException("Holiday name already exists choose diffrent!");
        }
  
        const updateObj: any = {};
  
        if (name) updateObj.name = name.trim().toLocaleLowerCase();
        if (files?.file?.length) {
          updateObj.assetsUrl = assetsUrl + 'sounds/' + files.file[0].filename;
        }
        if (start_date) updateObj.startDate = new Date(start_date);
        if (end_date) updateObj.endDate = new Date(end_date);
        updateObj.update_at = new Date();
        updateObj.isDeleted = false;
  
        const update = await this.serviceModel.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true }
        );
  
        if (!update) {
          throw new BadRequestException("Unable to update!");
        }
  
        let activityLog = new ActivityLogInterface();
        activityLog.Opration = 'Update';
        activityLog.action = 'update';
        activityLog.current = { ...updateObj, name: updateObj.name };
        activityLog.moduleName = this.ModuleName;
        activityLog.note = 'Object Updated';
        activityLog.userId = user._id;
        activityLog.user_name = user.name || user.email;
        Activity.InternalActivity(tenantId, activityLog);
        return { message: "Update successfully!" };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    async delete(id: string, user: User, tenantId) {
      try {
        let result = await this.serviceModel.findOne({ _id: id });
        if (!result) {
          throw new BadRequestException(`ID not valid`);
        }
  
        let obj: any = {};
        obj.update_at = new Date();
        obj.isDeleted = true;
  
        const response = await this.serviceModel.findOneAndUpdate(
          { _id: id },
          { $set: obj },
          {
            new: true,
          },
        );
  
        if (!response) {
          throw new BadRequestException(`Unable to delete.`);
        }
        let activityLog = new ActivityLogInterface();
        activityLog.Opration = 'Delete';
        activityLog.action = 'soft-delete';
        activityLog.previous = result;
        activityLog.current = { ...obj, name: result.name };
        activityLog.moduleName = this.ModuleName;
        activityLog.note = 'Object deleted';
        activityLog.userId = user._id;
        activityLog.user_name = user.name || user.email;
  
        Activity.InternalActivity(tenantId, activityLog);
  
        return { message: 'Deleted successfully!' };
  
      } catch (error) {
        return { error: error };
      }
    }
  
    //---------------Delete-holiday------
    //below functionality same as remove grp
    async RemoveHolidaySecound(id: string) {
      try {
        let result = await this.serviceModel.findOne({ _id: id });
        if (!result) {
          throw new BadRequestException(`ID not valid`);
        }
  
        // Find the group ID associated with the holiday
        const groupId = result.group;
  
        // Soft delete the holiday
        let obj: any = {};
        obj.update_at = new Date();
        obj.isDeleted = true;
  
        const response = await this.serviceModel.findOneAndUpdate(
          { _id: id },
          { $set: obj },
          {
            new: true,
          },
        );
  
        if (!response) {
          throw new BadRequestException(`Unable to delete.`);
        }
  
        // Find all holidays associated with the group
        const associatedHolidays = await this.serviceModel.find({ group: groupId });
  
        // Soft delete all associated holidays
        for (const holiday of associatedHolidays) {
          holiday.isDeleted = true;
          await holiday.save();
        }
  
        return { message: 'Holiday and associated holidays soft deleted successfully!' };
  
      } catch (error) {
        return { error: error };
      }
    }
  
  
  
  }
  