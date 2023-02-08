import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator/types/decorator/decorators';

export default class newAlkalmazottDto {
  @IsDefined({ message: 'Nev megadasa kotelezo' })
  teljesnev: string;

  @IsDate()
  kezdoDatum: Date;

  @IsInt({ message: 'szamnak kell lennie' })
  haviBer: number;

  @IsOptional({ message: '' })
  @Min(0, { message: 'beosztott minimum ertek 0' })
  @IsInt({ message: 'szamnak kell lennie' })
  beosztottakSzama: number;

  @IsEmail()
  hivatalosEmail: string;
}
