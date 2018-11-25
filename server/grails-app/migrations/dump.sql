--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.24
-- Dumped by pg_dump version 9.3.24
-- Started on 2018-11-17 10:59:11 MSK

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 172 (class 1259 OID 54043)
-- Name: production; Type: TABLE; Schema: public; Owner: warehouse-user; Tablespace: 
--

CREATE TABLE public.production (
    id bigint NOT NULL,
    version bigint NOT NULL,
    brand character varying(255) NOT NULL,
    price bigint NOT NULL,
    pack_size integer NOT NULL,
    name character varying(255) NOT NULL,
    amount integer NOT NULL,
    ext_id character varying(255) NOT NULL
);


ALTER TABLE public.production OWNER TO "warehouse-user";

--
-- TOC entry 173 (class 1259 OID 54051)
-- Name: role; Type: TABLE; Schema: public; Owner: warehouse-user; Tablespace: 
--

CREATE TABLE public.role (
    id bigint NOT NULL,
    version bigint NOT NULL,
    authority character varying(255) NOT NULL
);


ALTER TABLE public.role OWNER TO "warehouse-user";

--
-- TOC entry 174 (class 1259 OID 54056)
-- Name: user; Type: TABLE; Schema: public; Owner: warehouse-user; Tablespace: 
--

CREATE TABLE public."user" (
    id bigint NOT NULL,
    version bigint NOT NULL,
    password_expired boolean NOT NULL,
    username character varying(255) NOT NULL,
    account_locked boolean NOT NULL,
    password character varying(255) NOT NULL,
    account_expired boolean NOT NULL,
    enabled boolean NOT NULL
);


ALTER TABLE public."user" OWNER TO "warehouse-user";

--
-- TOC entry 175 (class 1259 OID 54064)
-- Name: user_role; Type: TABLE; Schema: public; Owner: warehouse-user; Tablespace: 
--

CREATE TABLE public.user_role (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.user_role OWNER TO "warehouse-user";

--
-- TOC entry 2047 (class 0 OID 54043)
-- Dependencies: 172
-- Data for Name: production; Type: TABLE DATA; Schema: public; Owner: warehouse-user
--

INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (1, 0, 'Avon', 150, 50, 'Product 1', 58, 'c8e77252-4692-4cfd-a472-5f27b3d873ad');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (2, 0, 'Ahava', 200, 150, 'Product 2', 5, '2f24c9a2-efaf-43f3-bcaf-147d34897b49');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (3, 0, 'Nivea', 250, 200, 'Product 3', 15, 'fa530a6a-76cb-4f2a-9917-74ef99b46d96');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (4, 0, 'Nivea', 300, 100, 'Product 4', 3, '4f7df8e5-e1f3-4b0e-9a26-4343bb6bb38c');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (5, 0, 'Nivea', 350, 50, 'Product 5', 36, 'f32e4b95-c1cd-413a-9701-3b23450b5991');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (6, 0, 'Avon', 100, 150, 'Product 6', 25, '7af6775d-01bc-46e9-9ef3-9c858fd4b47d');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (7, 0, 'Avon', 150, 200, 'Product 7', 94, '252bd52d-6f5b-4024-bfc8-e03aa915b9e6');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (8, 0, 'Nivea', 250, 50, 'Product 9', 76, '6be86763-b7a9-4e40-86f2-2712903858ad');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (9, 0, 'Nivea', 300, 150, 'Product 10', 55, '194e253a-db6e-4f8d-b455-1703ef80a503');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (10, 0, 'Nivea', 350, 200, 'Product 11', 27, 'ee63113c-747b-4ad2-b102-cf879e3398a1');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (11, 0, 'Avon', 100, 100, 'Product 12', 37, 'c41527e6-fd96-44bf-a13f-5f91329a5171');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (12, 0, 'Avon', 150, 50, 'Product 13', 69, '9653da75-b61a-4d11-83fb-24e83b5e1b06');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (13, 0, 'Ahava', 200, 150, 'Product 14', 85, 'aa1994bf-41ba-4013-abed-3d14e6dfb3da');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (14, 0, 'Nivea', 250, 200, 'Product 15', 56, 'a376305b-f67b-4055-adf0-9d2a5c24cde1');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (15, 0, 'Nivea', 300, 100, 'Product 16', 93, '0f9fd405-47e5-4c88-a932-c7e56ac53a34');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (16, 0, 'Nivea', 350, 50, 'Product 17', 14, 'a0f7d615-57a6-406b-a01e-c4d078831154');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (17, 0, 'Avon', 100, 150, 'Product 18', 0, 'ece0dd9f-4ae7-47f2-800a-ab9d176e5785');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (18, 0, 'Avon', 150, 200, 'Product 19', 36, '5f0f1c5d-ba26-4e90-9c6f-dba58f437d69');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (19, 0, 'Ahava', 200, 100, 'Product 20', 60, '20d6ce6c-b791-48d3-b603-f3844e068f88');
INSERT INTO public.production (id, version, brand, price, pack_size, name, amount, ext_id) VALUES (20, 0, 'Ahava', 200, 100, 'Product 8', 2, 'cc81cfbd-9f0b-43b7-9e07-f9abeb83ca73');


--
-- TOC entry 2048 (class 0 OID 54051)
-- Dependencies: 173
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: warehouse-user
--

INSERT INTO public.role (id, version, authority) VALUES (1, 0, 'ROLE_ADMIN');
INSERT INTO public.role (id, version, authority) VALUES (2, 0, 'ROLE_USER');


--
-- TOC entry 2049 (class 0 OID 54056)
-- Dependencies: 174
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: warehouse-user
--

INSERT INTO public."user" (id, version, password_expired, username, account_locked, password, account_expired, enabled) VALUES (3, 0, false, 'admin@warehouse.com', false, '$2a$10$Mbb30t.ByE/wXMGDXuUUjOnrui8WVPi7xYeidC73YbNCLi1lb.HAy', false, true);
INSERT INTO public."user" (id, version, password_expired, username, account_locked, password, account_expired, enabled) VALUES (4, 0, false, 'user@warehouse.com', false, '$2a$10$Rj9GRo1WxiK1ca.LXJc0OueYd/qJMHLsCcuqdRdPhYucINuyPsdBS', false, true);


--
-- TOC entry 2050 (class 0 OID 54064)
-- Dependencies: 175
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: warehouse-user
--

INSERT INTO public.user_role (user_id, role_id) VALUES (3, 1);
INSERT INTO public.user_role (user_id, role_id) VALUES (4, 2);


--
-- TOC entry 1927 (class 2606 OID 54050)
-- Name: production_pkey; Type: CONSTRAINT; Schema: public; Owner: warehouse-user; Tablespace: 
--

ALTER TABLE ONLY public.production
    ADD CONSTRAINT production_pkey PRIMARY KEY (id);


--
-- TOC entry 1929 (class 2606 OID 54055)
-- Name: role_pkey; Type: CONSTRAINT; Schema: public; Owner: warehouse-user; Tablespace: 
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 1931 (class 2606 OID 54070)
-- Name: uk_irsamgnera6angm0prq1kemt2; Type: CONSTRAINT; Schema: public; Owner: warehouse-user; Tablespace: 
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT uk_irsamgnera6angm0prq1kemt2 UNIQUE (authority);


--
-- TOC entry 1933 (class 2606 OID 54072)
-- Name: uk_sb8bbouer5wak8vyiiy4pf2bx; Type: CONSTRAINT; Schema: public; Owner: warehouse-user; Tablespace: 
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT uk_sb8bbouer5wak8vyiiy4pf2bx UNIQUE (username);


--
-- TOC entry 1935 (class 2606 OID 54063)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: warehouse-user; Tablespace: 
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 1937 (class 2606 OID 54068)
-- Name: user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: warehouse-user; Tablespace: 
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 1939 (class 2606 OID 54078)
-- Name: fka68196081fvovjhkek5m97n3y; Type: FK CONSTRAINT; Schema: public; Owner: warehouse-user
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fka68196081fvovjhkek5m97n3y FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- TOC entry 1938 (class 2606 OID 54073)
-- Name: fkfgsgxvihks805qcq8sq26ab7c; Type: FK CONSTRAINT; Schema: public; Owner: warehouse-user
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fkfgsgxvihks805qcq8sq26ab7c FOREIGN KEY (user_id) REFERENCES public."user"(id);


-- Completed on 2018-11-17 10:59:12 MSK

--
-- PostgreSQL database dump complete
--

