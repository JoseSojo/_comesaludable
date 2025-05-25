import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;
  
/**
 * Hashea
 */
export async function hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return hashed;
  }
  
  /**
   * Compara
   */
  export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  