const userListController = async (req, res, next) => {
	try {
		let { searchTerm = "", page = 1 } = req.query;
		page = Number(page);
		const limit = 10;
		const offset = (page - 1) * limit;
		const totalUsers = await selectTotalUsersModel(searchTerm);
		const totalPages = Math.ceil(totalUsers / limit);

		const users = await userListModel(searchTerm, limit, offset);

		res.send({
			status: "ok",
			data: {
				users,
				totalPages,
				currentPage: page,
				totalUsers,
				prevPage: page > 1 ? page - 1 : null,
				nextPage: page < totalPages ? page + 1 : null,
			},
		});
	} catch (error) {
		next(error);
	}
};

export default userListController;
