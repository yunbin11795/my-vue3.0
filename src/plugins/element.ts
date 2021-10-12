import { ElButton, ElRadio ,ElTable,ElTableColumn} from 'element-plus'

export default (app:any) => {
  app.component("ElButton",ElButton);
  app.component(ElRadio);
  app.component(ElTable);
  app.component(ElTableColumn);
}
