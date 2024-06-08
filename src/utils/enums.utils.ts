export const CurrentDate = new Date();

export const CurrentDateAddOneDay = new Date(
   new Date().setDate(new Date().getDate() + 1),
);

export const CurrentDateAddTwoDay = new Date(
   new Date().setDate(new Date().getDate() + 2),
);

export const CurrentDateAddThreeDay = new Date(
   new Date().setDate(new Date().getDate() + 3),
);

export enum EnuValueExampleSwagger {
   UniqueIdentifier = "XXXX-XXXX-XXXX-XXXX",
}
