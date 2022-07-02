-- public.geriadv1_users definition

-- Drop table

-- DROP TABLE public.geriadv1_users;

CREATE TABLE public.geriadv1_users (
	id serial4 NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) NULL,
	CONSTRAINT geriadv1_users_pkey PRIMARY KEY (id)
);


-- public.geriadv1_logs definition

-- Drop table

-- DROP TABLE public.geriadv1_logs;

CREATE TABLE public.geriadv1_logs (
	id serial4 NOT NULL,
	payload json NOT NULL,
	user_id int4 NULL,
	subject varchar(255) NOT NULL,
	"action" public.enum_geriadv1_logs_action NOT NULL,
	"createdAt" timestamptz NOT NULL,
	CONSTRAINT geriadv1_logs_pkey PRIMARY KEY (id),
	CONSTRAINT geriadv1_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.geriadv1_users(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- public.geriadv1_processos definition

-- Drop table

-- DROP TABLE public.geriadv1_processos;

CREATE TABLE public.geriadv1_processos (
	id serial4 NOT NULL,
	datacomparecimento varchar(255) NULL,
	nomebeneficiario varchar(255) NULL,
	telefone varchar(255) NULL,
	celular varchar(255) NULL,
	telefone2 varchar(255) NULL,
	logradouro varchar(255) NULL,
	numero varchar(255) NULL,
	complemento varchar(255) NULL,
	bairro varchar(255) NULL,
	cidade varchar(255) NULL,
	cep varchar(255) NULL,
	beneficiorequerido varchar(255) NULL,
	indicacao varchar(255) NULL,
	pendenciadedocumentos varchar(255) NULL,
	informacaocomplementar varchar(255) NULL,
	enviados varchar(255) NULL,
	entrada varchar(255) NULL,
	cpf varchar(255) NULL,
	senhadocliente varchar(255) NULL,
	situacao varchar(255) NULL,
	novaentrada varchar(255) NULL,
	datapesquisa varchar(255) NULL,
	advogadoqueassinou varchar(255) NULL,
	pagamento varchar(255) NULL,
	email varchar(255) NULL,
	avaliacaopericia varchar(255) NULL,
	status int4 NOT NULL,
	user_id int4 NULL,
	CONSTRAINT geriadv1_processos_pkey PRIMARY KEY (id),
	CONSTRAINT geriadv1_processos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.geriadv1_users(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- public.geriadv1_tramitacoes definition

-- Drop table

-- DROP TABLE public.geriadv1_tramitacoes;

CREATE TABLE public.geriadv1_tramitacoes (
	id serial4 NOT NULL,
	carga varchar(255) NULL,
	sicopsequencia varchar(255) NULL,
	sicopdatadespacho varchar(255) NULL,
	sicopdatarecebimento varchar(255) NULL,
	sicopdatasaida varchar(255) NULL,
	sicopcoddespacho varchar(255) NULL,
	sicopdescrdespacho varchar(255) NULL,
	sicoorgorigem varchar(255) NULL,
	sicopdescrorgorgiem varchar(255) NULL,
	sicoporgdestino varchar(255) NULL,
	sicopdescrorgdestino varchar(255) NULL,
	sicoporgdigitador varchar(255) NULL,
	sicopdescrorgdigit varchar(255) NULL,
	sicopmatrdigitador varchar(255) NULL,
	sicopmatrrecebedor varchar(255) NULL,
	ctrt varchar(255) NULL,
	"data" varchar(255) NULL,
	tecnico text NULL,
	anotacao text NULL,
	status int4 NOT NULL,
	processo_id int4 NULL,
	user_id int4 NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT geriadv1_tramitacoes_pkey PRIMARY KEY (id),
	CONSTRAINT geriadv1_tramitacoes_processo_id_fkey FOREIGN KEY (processo_id) REFERENCES public.geriadv1_processos(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT geriadv1_tramitacoes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.geriadv1_users(id) ON DELETE SET NULL ON UPDATE CASCADE
);