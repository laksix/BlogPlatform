import clasess from '../createNewUser/createNewUser.module.scss';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signUser } from '../store/reducers/ActionCreators';
import { IFormInput } from '../createNewUser/createNewUser';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const SignUser = () => {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.UserSlice.errorMessage);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    dispatch(signUser(data));
  };
  return (
    <div className={clasess.box}>
      <div className={clasess.mainBox}>
        <div className={clasess.title}>Sign In</div>
        <div className={clasess['mainBox-inputs']}>
          <div className={clasess['inputBox']}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>Email address</label>
                <input
                  className={clasess.inputSet}
                  placeholder="Email address"
                  type="email"
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errorMessage.length !== 0 && (
                  <p className={clasess.inputError}> {`${errorMessage}, повторите попытку`}</p>
                )}
                {errors?.email?.type === 'required' && <p className={clasess.inputError}>Заполните поле</p>}
                {errors?.email?.type === 'pattern' && (
                  <p className={clasess.inputError}>Почтовый адрес должен быть корректным</p>
                )}
              </div>

              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>Password</label>
                <input
                  className={clasess.inputSet}
                  placeholder="Password"
                  type="password"
                  {...register('password', {
                    required: true,
                    maxLength: 40,
                    minLength: 6,
                    pattern: /^([A-Za-z]|[0-9])|([0-9]|[A-Za-z])+$/i,
                  })}
                />
                {errorMessage.length !== 0 && (
                  <p className={clasess.inputError}> {`${errorMessage}, повторите попытку`}</p>
                )}
                {errors?.password?.type === 'pattern' && (
                  <p className={clasess.inputError}>Введите корректный пароль</p>
                )}
                {errors?.password?.type === 'maxLength' ||
                  (errors?.password?.type === 'minLength' && (
                    <p className={clasess.inputError}>Пароль должен состоять из символов от 6 до 40 знаков</p>
                  ))}
              </div>
              <div className={clasess.inputForm}>
                <input className={clasess.submitForm} type="submit" />
              </div>
            </form>
          </div>
        </div>
        <div className={clasess.quation}>
          Don’t have an account?{' '}
          <Link className={clasess.linkUp} to="/sign-up">
            Sign Up.
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUser;
