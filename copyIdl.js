const fs = require('fs')
const idl = require('./maius-event-manage/target/idl/maius_event_manage.json')

fs.writeFileSync('src/types/idl.json', JSON.stringify(idl))
fs.copyFileSync(
  'maius-event-manage/target/types/maius_event_manage.ts',
  'src/types/maius_event_manage.ts',
)

fs.writeFileSync('backend/src/types/idl.json', JSON.stringify(idl))
fs.copyFileSync(
  'maius-event-manage/target/types/maius_event_manage.ts',
  'backend/src/types/maius_event_manage.ts',
)
