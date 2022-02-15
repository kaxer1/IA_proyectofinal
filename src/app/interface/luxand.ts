export interface Luxand {
    gender:     Gender;
    age:        number;
    expression: Gender[];
    age_group:  string;
    rectangle:  Rectangle;
}

export interface Gender {
    value:       string;
    probability: number;
}

export interface Rectangle {
    left:   number;
    top:    number;
    right:  number;
    bottom: number;
}