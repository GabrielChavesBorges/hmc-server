import { registerEnumType } from "@nestjs/graphql";

export enum Season {
    SPRING = 'SPRING',
    SUMMER = 'SUMMER',
    FALL = 'FALL',
    WINTER = 'WINTER',
}


registerEnumType(Season, {
    name: 'Season',
});
