# Cuendillar API

### Регистрация
#### Запрос
    Url:/registration
    Method: POST
    Body Type: JSON
    Body value: 
        {
        Login string
        Password string
        Email string
        }
#### Ответ
    ErrCode or 200
    
    
### Авторизация
#### Запрос
    Url:/signin
    Method: POST
    Body Type: JSON
    Body value: 
        {
        Password string
        Email string
        }
#### Ответ
    Body Type: JSON
    Body balue:
        {
		Exist bool   
		Id    uint  
		Login string 
		Email string 
		Token string 
	    }
	Headers set
	{
	    X-CSRF-Token
	}
	Set Cookies
    
### Выход
#### Запрос
    Url:/logout
    Method: POST
#### Ответ
	Delete Cookies (set time -1)
	
	
### Получение информации о пользователе
#### Запрос
    Url:/getuser
    Method: POST
    Use cookie
#### Ответ
    Body Type: JSON
    Body balue:
        {
		Id    uint  
		Login string 
		Email string 
		Token string (X-CSRF-Token)
	    }


### Изменение профиля
#### Запрос
    Url:/changeprofile
    Method: POST
    Body Type: JSON
    Body value: 
        {
		Email    string
		Password string
		Token    string (X-CSRF-Token)
	}
#### Ответ
    Body Type: JSON
    Body value: 
    {
		Id    uint   
		Login string 
		Email string 
	}
	

### Отправка аватара
#### Запрос
    Url:/sendAvatar
    Method: POST
    Header: X-Csrf-Token
    Body Type: MultipartForm
    Body value: avatar file
#### Ответ
    Response status
    
    
### Получение аватара
#### Запрос
    Url:/getAvatar{*} (* - random string)
    Method: GET
#### Ответ
    Body: avatar file

### Получение списка заданий
#### Запрос
    Url:/getTasks
    Method: POST
    Body Type: JSON
    Body value: 
        {
		Numberoftask int 
	    }
#### Ответ
    Body Type: JSON
    Body value: 
    {[
    {
	Id         uint  
	OrderLogin string 
	Title      string 
	Text       string
	Tag        string 
	Time       string
    }
    ...
    ]}

### Получение конкретного задания
#### Запрос
    Url:/getOneTask
    Method: POST
    Body Type: JSON
    Body value: 
        {
		TaskId int
	    }
#### Ответ
    Body Type: JSON
    Body value: 
    {
	Id         uint  
	OrderLogin string 
	Title      string 
	Text       string
	Tag        string 
	Time       string
    }