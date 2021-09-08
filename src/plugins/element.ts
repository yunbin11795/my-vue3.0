import { ElButton, ElRadio ,ElTable,ElTableColumn} from 'element-plus'

export default (app:any) => {
  app.use(ElButton);
  app.use(ElRadio);
  app.use(ElTable);
  app.use(ElTableColumn);
}
