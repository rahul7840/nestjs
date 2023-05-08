@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name, {
		timestamp: true,
	});

	async updateUser(_id: string, dto: UpdateUser) {
		try {
			const { name, email } = dto;

			const validateID = await this.userModel.findById(_id);
			if (!validateID) {
				return { message: "this ID not exist!" };
			}

			const duplicate = await this.userModel.findOne({ email });
			if (duplicate) {
				return { message: "Email allready exists" };
			}

			validateID.fullName = name;
			validateID.email = email;
			validateID.updatedAt = new Date();

			const updatedUser = await validateID.save();
			if (!updatedUser) {
				return { message: "Unable to update" };
			} else return { message: "Update Successfully" };
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException("Internal server error");
		}
	}
}
