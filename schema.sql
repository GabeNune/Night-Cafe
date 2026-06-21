create table categories(
  id SERIAL PRIMARY KEY,
  nome varchar
);

create table tasks(
  id SERIAL PRIMARY KEY,
  nome varchar,
  categoria INT,
  concluida BOOLEAN DEFAULT FALSE,
  foreign key (categoria)
  references categories(id)
);

create table weekly_block(
  id SERIAL PRIMARY KEY,
  categoria INT,
  dia_semana  INT,
  hora_inicio TIME,
  hora_fim    TIME,
  foreign key (categoria)
  references categories(id)
);

create table pomodoro_sessions(
  id SERIAL PRIMARY KEY,
  task_atual INT,
  descansos INT,
  aconteceu TIMESTAMP, 
  foco INT,
  foreign key (task_atual)  
  references tasks(id)
);