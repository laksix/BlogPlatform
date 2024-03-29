import clasess from '../createNewUser/createNewUser.module.scss';
import { useForm } from 'react-hook-form';
import { IFormInput } from '../createNewUser/createNewUser';
import { useState } from 'react';
import { createArticle } from '../store/reducers/ActionCreators';

import TagsList from '../tagsList/tagsList';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
const createNewArticle = () => {
  const dispatch = useAppDispatch();
  const currentToken = useAppSelector((state) => state.UserSlice.currentUser.token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [inputValues, setInputValues] = useState(['']);
  const currentValues = inputValues.filter((e) => e.trim() !== '');
  console.log(currentValues);
  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };
  const handleDelete = (index) => {
    const newValues = [...inputValues];
    newValues.splice(index, 1);
    setInputValues(newValues);
  };
  const handleAdd = () => {
    setInputValues([...inputValues, '']);
  };
  const onSubmit = (data: IFormInput) => {
    dispatch(createArticle(data, currentValues, currentToken));
  };

  return (
    <div className={clasess.box}>
      <div className={clasess.mainBoxCreate}>
        <div className={clasess.title}>Create new article</div>
        <div className={clasess['mainBox-inputs']}>
          <div className={clasess['inputBox']}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>Title</label>
                <input
                  className={clasess.inputSetCreate}
                  placeholder="Title"
                  {...register('nameOfArticle', {
                    required: true,
                    pattern: /^([A-Za-z]|[0-9])|([0-9]|[A-Za-z])+$/i,
                  })}
                />
                {errors?.nameOfArticle?.type === 'required' && <p className={clasess.inputError}>Заполните поле</p>}
                {errors?.nameOfArticle?.type === 'pattern' && (
                  <p className={clasess.inputError}>Используйте только заглавные или строчные буквы</p>
                )}
              </div>
              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>Short description</label>
                <input
                  className={clasess.inputSetCreate}
                  placeholder="Title"
                  type="text"
                  {...register('decriptionOfAritcle', {
                    required: true,
                    pattern: /^([A-Za-z]|[0-9])|([0-9]|[A-Za-z])+$/i,
                  })}
                />
                {errors?.decriptionOfAritcle?.type === 'required' && (
                  <p className={clasess.inputError}>Заполните поле</p>
                )}
                {errors?.email?.type === 'pattern' && (
                  <p className={clasess.inputError}>Используйте только заглавные или строчные буквы</p>
                )}
              </div>

              <div className={clasess.currentInput}>
                <label className={clasess.inputName}>Text</label>
                <textarea
                  className={clasess.inputSetCreateText}
                  placeholder="Text"
                  {...register('textOfAritcle', {
                    required: true,
                  })}
                />
                {errors?.textOfAritcle?.type === 'required' && <p className={clasess.inputError}>Заполните поле</p>}
              </div>
              <div className={clasess.tags}>
                {' '}
                Tags
                <>
                  {inputValues.map((value, index) => {
                    return (
                      <TagsList
                        key={index}
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onDelete={() => handleDelete(index)}
                      />
                    );
                  })}
                </>
                <div className={clasess.addTag} onClick={handleAdd}>
                  Add tag
                </div>
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
export default createNewArticle;
