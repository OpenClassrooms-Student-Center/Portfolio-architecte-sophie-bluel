
module.exports = (sequelize, DataTypes) => {
	const Works = sequelize.define(
		"works",
		{
		title: {
			type: DataTypes.STRING,
			allowNull: false
			},
		imageUrl: {
			type: DataTypes.STRING,
			allowNull: false
			}
		},
		{timestamps:false}
	)
	return Works
}
