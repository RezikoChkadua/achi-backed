import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {  
    @IsNotEmpty() 
    username: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()  
    @IsEmail()
    email: string;

    public static from(dto: Partial<CreateUserDto>) {
        const it = new CreateUserDto();
        it.username = dto.username;
        it.password = dto.password;
        it.email = dto.email
        return it;
      }
    
      public static fromEntity(entity: CreateUserDto) {
        return this.from({
          username: entity.username,
          password: entity.password,
          email: entity.email
        });
      }
    
      public static toEntity(dto: CreateUserDto) {
        const it = new CreateUserDto();
        it.username = dto.username
        it.password = dto.password
        it.email = dto.email
        return it;
      }
    
}
