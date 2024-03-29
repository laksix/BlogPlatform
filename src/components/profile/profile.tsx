import clasess from '../createNewUser/createNewUser.module.scss';
import { useForm } from 'react-hook-form';
import { updateUser } from '../store/reducers/ActionCreators';
import { IFormInput } from '../createNewUser/createNewUser';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Alert } from 'antd';

const Profile = () => {
  const currentToken = useAppSelector((state) => state.UserSlice.currentUser.token);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    dispatch(updateUser(data, currentToken));
  };
  const currentErrors = useAppSelector((state) => state.UserSlice.errors);
  const defaultUserInfo = useAppSelector((state) => state.UserSlice.currentUser);
  const completeEdit = useAppSelector((state) => state.UserSlice.editProfile);
  return (
    <div className={clasess.box}>
      {completeEdit ? (
        <Alert
          className={clasess.alertMessage}
          message="Изменение данных"
          description="Данные успешно изменены."
          type="success"
          showIcon
        />
      ) : null}
      <div className={clasess.mainBox}>
        <div className={clasess.title}>Edit Profile</div>
        <div className={clasess['mainBox-inputs']}>
          <div className={clasess['inputBox']}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>Username</label>
                <input
                  className={clasess.inputSet}
                  defaultValue={defaultUserInfo.username}
                  placeholder="Username"
                  {...register('username', {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    pattern: /^[a-z][a-z0-9]*$/,
                  })}
                />
                {currentErrors?.username && (
                  <p className={clasess.inputError}>Данное имя использовалось, введите другое и повторите запрос</p>
                )}
                {errors?.username?.type === 'required' && <p className={clasess.inputError}>Заполните поле</p>}
                {errors?.username?.type === 'maxLength' && (
                  <p className={clasess.inputError}>Имя пользователя должно состоять из 3 до 20 символов</p>
                )}
                {errors?.username?.type === 'minLength' && (
                  <p className={clasess.inputError}>Имя пользователя должно состоять из 3 до 20 символов</p>
                )}
                {errors?.username?.type === 'pattern' && (
                  <p className={clasess.inputError}>Используйте только заглавные или строчные буквы</p>
                )}
              </div>
              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>Email address</label>
                <input
                  className={clasess.inputSet}
                  defaultValue={defaultUserInfo.email}
                  placeholder="Email address"
                  type="email"
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {currentErrors?.email && (
                  <p className={clasess.inputError}>Данный email использовался, введите другой и повторите запрос</p>
                )}
                {errors?.email?.type === 'required' && <p className={clasess.inputError}>Заполните поле</p>}
                {errors?.email?.type === 'pattern' && (
                  <p className={clasess.inputError}>Почтовый адрес должен быть корректным</p>
                )}
              </div>

              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>New password</label>
                <input
                  className={clasess.inputSet}
                  placeholder="New password"
                  type="password"
                  {...register('password', {
                    required: true,
                    maxLength: 40,
                    minLength: 6,
                    pattern: /^([A-Za-z]|[0-9])|([0-9]|[A-Za-z])+$/i,
                  })}
                />
                {errors?.password?.type === 'pattern' && (
                  <p className={clasess.inputError}>Введите корректный пароль</p>
                )}
                {errors?.password?.type === 'maxLength' ||
                  (errors?.password?.type === 'minLength' && (
                    <p className={clasess.inputError}>Пароль должен состоять из символов от 6 до 40 знаков</p>
                  ))}
              </div>
              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>Avatar image (url)</label>
                <input
                  className={clasess.inputSet}
                  defaultValue={defaultUserInfo.image}
                  placeholder="Avatar image"
                  type="avatar"
                  {...register('url', {
                    required: true,
                    pattern: /^(https?:\/\/)?([\w\d-]+\.)?[\w\d-]+\.\w{2,}(\/.*)?$/,
                  })}
                />
                {errors?.url?.type === 'pattern' && <p className={clasess.inputError}>Введите корректную ссылку</p>}
              </div>
              <div className={clasess.inputForm}>
                <input className={clasess.submitForm} type="submit" />
              </div>
            </form>
          </div>
        </div>
        <div className={clasess.quation}></div>
      </div>
    </div>
  );
};
export default Profile;
