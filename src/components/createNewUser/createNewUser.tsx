import { useForm } from "react-hook-form";
import clasess from './createNewUser.module.scss'
import { Link } from 'react-router-dom'
import {createNewUser} from '../store/reducers/ActionCreators'
import { useAppDispatch, useAppSelector } from "../hooks/redux";

export interface IFormInput {
    username: string;
    email:string;
    password:string | number,
    repeatPassword: string,
    checkbox:boolean,
    url: string;
    example: string;
  }

const CreateNewUser = () => {
  const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm<IFormInput>();
      
      const onSubmit = (data: IFormInput) => {
        dispatch(createNewUser(data))
      };
      const passWatch = watch('password')
    const currentErrors = useAppSelector(state => state.UserSlice.errors)
    return (
        <div className={clasess.box}>
        <div className={clasess.mainBox}>
         <div className={clasess.title}>Create new account</div>
          <div className={clasess['mainBox-inputs']}>
           <div className={clasess['inputBox']}>
           <form onSubmit={handleSubmit(onSubmit)}>
            <div className={clasess.currentInput}>
            <label className={clasess.inputName}>Username</label>
            <input className={clasess.inputSet} placeholder="Username"
        {...register("username", {
          required: true,
          minLength: 3,
          maxLength: 20,
          pattern: /^[a-z][a-z0-9]*$/,
        })}
      />
      {currentErrors?.username && <p className={clasess.inputError}>Данное имя использовалось, введите другое и повторите запрос</p>}
      {errors?.username?.type === "required" && <p className={clasess.inputError}>Заполните поле</p>}
      {errors?.username?.type === "maxLength" && (
        <p className={clasess.inputError}>Имя пользователя должно состоять из 3 до 20 символов</p>
      )}
      {errors?.username?.type === "minLength" && (
        <p className={clasess.inputError}>Имя пользователя должно состоять из 3 до 20 символов</p>
      )}
      {errors?.username?.type === "pattern" && (
        <p className={clasess.inputError}>Используйте только заглавные или строчные буквы</p>
      )}
      </div>
      <div className={clasess.currentInput}>
            <label className={clasess.inputName}>Email address</label>
            <input className={clasess.inputSet} placeholder="Email address" type="email"
        {...register("email", {
          required: true,
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      {currentErrors?.email && <p className={clasess.inputError}>Данный email использовался, введите другой и повторите запрос</p>}
      {errors?.email?.type === "required" && <p className={clasess.inputError}>Заполните поле</p>}
      {errors?.email?.type === "pattern" && (
        <p className={clasess.inputError}>Почтовый адрес должен быть корректным</p>
      )}
      </div>



      <div className={clasess.currentInput}>
            <label className={clasess.inputName}>Password</label>
            <input className={clasess.inputSet} placeholder="Password" type="password"
        {...register("password", {
          required: true,
          maxLength:40,
          minLength:6,
          pattern: /^([A-Za-z]|[0-9])|([0-9]|[A-Za-z])+$/i
        })}
      />
      {errors?.password?.message !== errors?.repeatPassword?.message && <p className={clasess.inputError}>Пароли должны совпадать</p>}
      {errors?.password?.type === "pattern" && (
        <p className={clasess.inputError}>Введите корректный пароль</p>
      )}
      {errors?.password?.type === 'maxLength' || errors?.password?.type === 'minLength'  && <p className={clasess.inputError}>Пароль должен состоять из символов от 6 до 40 знаков</p>}

      </div>



      <div className={clasess.currentInput}>
            <label className={clasess.inputName}>Repeat Password</label>
            <input className={clasess.inputSet} placeholder="Password" type="password"
        {...register("repeatPassword", {
          required: true,
          validate: (e) => {
            if (passWatch !== e){
              return 'Пароли должны совпадать'
            }
          }
        })}
      />
      {errors?.repeatPassword && <p className={clasess.inputError}>Пароли должны совпадать</p>}
      </div>
      
      <div className={clasess.currentCheckBox}>
      <label className={clasess.currentCheckBox}>
            <input className={clasess.CheckBoxSet} type="checkbox"
        {...register("checkbox", {
          required: true,
          
        })}
      />
      I agree to the processing of my personal information</label>
      
      </div>
      {errors?.checkbox?.type === 'required' && <p className={clasess.inputError}>Подтвердите соглашение</p>}
      <div className={clasess.inputForm}><input className={clasess.submitForm} type="submit" /></div>
        </form>
           </div>
          </div>
          <div className={clasess.quation}>Already have an account? <Link className={clasess.linkUp} to = '/sign-in'>Sign In.</Link></div>
        </div>
        </div>
    )
}

export default CreateNewUser