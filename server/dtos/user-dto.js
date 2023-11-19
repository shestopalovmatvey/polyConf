module.exports = class UserDto {
    userName;
    email;
    id;


    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.userName = model.userName
    }
}