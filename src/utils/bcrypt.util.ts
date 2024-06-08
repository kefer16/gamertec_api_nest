import * as bcrypt from "bcrypt";

export const encrypt = async (password: string): Promise<string> => {
   const hash = await bcrypt.hash(password, 10);

   return hash;
};

export const comparePassword = async (
   passwordOriginal: string,
   passwordEncrypt: string,
): Promise<boolean> => {
   const passwordValid = await bcrypt.compare(
      passwordOriginal,
      passwordEncrypt,
   );
   return passwordValid;
};
