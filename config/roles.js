const allRoles = {
    user: ['verifyEmail'],
    admin: ['getUsers', 'manageUsers', 'getSettings', 'manageSettings'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};
