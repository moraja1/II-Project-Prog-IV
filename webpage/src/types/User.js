export class User
{
    constructor(id, naturalId, password, name, lastName, mobile, email, enabled, type, role, isAuthorized) {
        this.id = id;
        this.naturalId = naturalId;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.mobile = mobile;
        this.email = email;
        this.enabled = enabled;
        this.type = type;
        this.role = role;
        this.isAuthorized = isAuthorized;
    }

    set loginForm([naturalId, password]) {
        this.naturalId = naturalId;
        this.password = password;
    }
}