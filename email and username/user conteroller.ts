export class UserController {
	constructor(private userService: UserService) {}

	@Patch("update/:id")
	@UseGuards(RoleGuard)
	@Roles(Role.ADMIN)
	@ApiOperation({ summary: "Change User name and email." })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({
		status: 422,
		description: "Bad Request or API error message",
	})
	@ApiResponse({
		status: 403,
		description: "You are not allowed to access this resource.",
	})
	@ApiResponse({ status: 404, description: "User not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@HttpCode(200)
	async updateUser(@Param("id") _id: string, @Body() dto: UpdateUser) {
		return await this.userService.updateUser(_id, dto);
	}
}
