using materiais from '../db/schema';
service MateriaisService {
   entity Material as projection on materiais.Material;
   function filtroMateriais(quantidade : Integer) returns array of Material;
   action adicionarMaterial(ID : Integer, NumMat : Integer, Nome : String, Descr : String) returns {
       sucesso : Boolean;
       mensagem : String;
   };
}