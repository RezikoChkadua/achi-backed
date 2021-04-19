import { IsNotEmpty } from "class-validator";
import { User } from "../../models/user.entity";

export class UserDto {  
    @IsNotEmpty() 
    username: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    email: string;

  public static from(dto: Partial<UserDto>) {
    const it = new UserDto();
    it.username = dto.username;
    it.password = dto.password;
    it.email = dto.email
    return it;
  }

  public static fromEntity(entity: User) {
    return this.from({
      username: entity.username,
      password: entity.password,
      email: entity.email
    });
  }

  public static toEntity(dto: UserDto) {
    const it = new User();
    it.username = dto.username
    it.password = dto.password
    it.email = dto.email
    return it;
  }

}

