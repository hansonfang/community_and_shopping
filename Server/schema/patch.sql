alter table tb_journalism drop column id; -- 删除book表之前的id列
alter table tb_journalism add id int(11); -- 添加id列
alter table tb_journalism change id id int(11) not null auto_increment primary key; -- 设置id为自增长列，主
