import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseEntity } from "typeorm/repository/BaseEntity"
import { IsString, IsEmail, MinLength } from "class-validator"
import { Exclude } from "class-transformer"
import * as bcrypt from "bcrypt"

@Entity()
export default class User extends BaseEntity {

  setPassword(rawPassword: string) {
    return bcrypt.hash(rawPassword, 10)
      .then(hash => { this.password = hash })
      .catch(console.error)
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  firstName: string

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  lastName: string

  @IsEmail()
  @Column("text", { nullable: false })
  email: string

  @IsString()
  @MinLength(3)
  @Column("text")
  city: string

  @IsString()
  @MinLength(8)
  @Column("text", { nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string
}