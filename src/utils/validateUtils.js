export const countryRegExps = {
    name: /[a-zA-Zа-яА-Я\s\d_"#№'()]{0,150}/,
    shortName: /[a-zA-Zа-яА-Я\s\d_"#№'()]{0,50}/,
    alpha2: /[A-Z]{2}/,
    alpha3: /[A-Z]{3}/,
    iso: /\d{3}/,
};

export const offerRegExps = {
    name: /[a-zA-Zа-яА-Я\s\d_"#№'()]{0,150}/,    
    domine: /([\w-]{1,32}.){2,50}/,
    country_id: /\d{1,20}/,
    target_action_id: /\d{1,20}/,
    target_action_price: /\d{1,10}/,
};

export const partnerDetails = {
    inn: /^(([0-9]{12})|([0-9]{10}))?$/,
    fullName: /^[А-Я][а-яА-Я\-]{0,}\s[А-Я][а-яА-Я\-]{1,}\s[А-Я][а-яА-Я\-]{1,}?$/,
    snils: /^(\d{11})?$/,
    dateBirth: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/,    
    bic: /^(\d{9})?$/,    
    kpp: /^([0-9]{9})?$/,
    ogrn: /^([0-9]{13})?$/,
    ks: /^(\d{20})?$/,
    rs: /^((\d{20})|(\d{25}))?$/,
};

export const path = {
    path_id: /\d{0,20}/,
    amount: /\d{0,20}/,    
    pay_interval: /\d{0,20}/,
}

export const validateByRegExp = (value, regExp) => {
    let isValid = false;
    if (typeof value === "string" && !!value) {
        const matchedValue = value.match(regExp) ? value.match(regExp)[0] : null;
        isValid = !!matchedValue && matchedValue.length === value.length;
    } else 
    if (!value){
        isValid = true
    }
    return isValid;
};
