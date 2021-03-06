PGDMP         +    
            x            copicochatapp_pg    11.5    11.5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    16682    copicochatapp_pg    DATABASE     �   CREATE DATABASE copicochatapp_pg WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_India.1252' LC_CTYPE = 'English_India.1252';
     DROP DATABASE copicochatapp_pg;
             postgres    false            �            1259    16683    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         postgres    false            �            1259    16712    chat    TABLE     �   CREATE TABLE public.chat (
    id integer NOT NULL,
    "chatContent" character varying(255),
    "userId" integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.chat;
       public         postgres    false            �            1259    16710    chat_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.chat_id_seq;
       public       postgres    false    200                       0    0    chat_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.chat_id_seq OWNED BY public.chat.id;
            public       postgres    false    199            �            1259    16701    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password text,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public."user";
       public         postgres    false            �            1259    16699    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public       postgres    false    198                       0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
            public       postgres    false    197            �
           2604    16715    chat id    DEFAULT     b   ALTER TABLE ONLY public.chat ALTER COLUMN id SET DEFAULT nextval('public.chat_id_seq'::regclass);
 6   ALTER TABLE public.chat ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    200    199    200            �
           2604    16704    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    198    198            
          0    16683    SequelizeMeta 
   TABLE DATA               /   COPY public."SequelizeMeta" (name) FROM stdin;
    public       postgres    false    196   g                 0    16712    chat 
   TABLE DATA               U   COPY public.chat (id, "chatContent", "userId", "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    200   �                 0    16701    user 
   TABLE DATA               U   COPY public."user" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
    public       postgres    false    198   r                  0    0    chat_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.chat_id_seq', 3, true);
            public       postgres    false    199                       0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 6, true);
            public       postgres    false    197            �
           2606    16687     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public         postgres    false    196            �
           2606    16717    chat chat_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_pkey;
       public         postgres    false    200            �
           2606    16709    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public         postgres    false    198            �
           2606    16718    chat chat_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT "chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 A   ALTER TABLE ONLY public.chat DROP CONSTRAINT "chat_userId_fkey";
       public       postgres    false    2701    200    198            
   G   x�32020�42426610�--N-��*�2B��&g$� 		CS#ct�@����#C �nH� �!         �   x�}�=�0��9�'���$ն����0�b�H��{k�R���y��5���tC��A���`��N���#&�"EՙR�Ґ2R畖+ZM�+W���.$�a{��Q����8�B��wJ��*��y���>}�Ck��C,�P�䲮���s��3�G�         �   x�M��
�0���)|����
zT�x�ei�tiSJ��$n%��ͷ�Ÿes�Й:���d����'�{|j��f�@)���=��0�(D��2/01
���#���GJד�^���[�n�מ���'�J)��K�     