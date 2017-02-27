var bcrypt = require('bcrypt');

export function password_hash(raw_password){
    return bcrypt.hashSync(raw_password, 4);
}

export function password_compare(raw_password, hash){
    return bcrypt.compareSync(raw_password, hash);
}
