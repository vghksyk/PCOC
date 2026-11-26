// 公開識別碼，不是 Client Secret。部署前請資訊室確認 Client ID 是否為核准用於 PCOC 的最新 App。
// 重要：請勿在本檔案放入 Client Secret、密碼、Access Token 或病人資料。
window.PCOC_CONFIG = Object.freeze({
  clientId: '528719ff-4e80-49df-9e96-0e25bbda118f', // 先前收到的較新一組；需資訊室確認
  tenantId: '24de0681-c8f7-46e8-8da7-1f5b393d834d',
  redirectUri: 'https://vghksyk.github.io/PCOC/redirect.html',
  graphScope: 'Sites.Selected',
  siteId: 'cmh2400.sharepoint.com,8fcd3d6b-bdb7-4a2d-b265-fc609620e464,1dbaf801-0a68-4ebd-92e4-1122a54e6199', // 已成功寫入的個人 TEST 站台
  listId: 'c5da080d-3e3f-4ac1-95a5-990e88d34ac2', // 測試 List；正式版不可使用個人站台
  // schema 6 遷移前必須先讓 SharePoint record_id 可重複、assessment_id 唯一
  fieldMappingVerified: true, // 新欄位確認後才改 true
  recordIdNonUniqueVerified: true, // 已於 SharePoint 將 record_id「強制唯一值」改為否，才改 true
  assessmentIdUniqueVerified: true, // assessment_id 文字欄且強制唯一值為是，才改 true
  encounterIdDateTimeVerified: true, // encounter_id 目前是含時間的 DateTime，核對儲存成功後才改 true
  includeTitle: true, // Title = case_id（同一病歷號允許多次評估）
  fieldMap: { // 左邊是本網頁輸出欄位，右邊填 SharePoint 真正 Internal Name
    assessment_id: 'assessment_id', record_id: 'record_id', saved_at: 'saved_at', app_version: 'app_version',
    data_schema_version: 'data_schema_version', date: 'date', case_id: 'case_id',
    patient_link_mode: 'patient_link_mode', assessor_ref: 'assessor_ref',
    encounter_id: 'encounter_id', diagnosis: 'diagnosis', unit: 'unit',
    shift: 'shift', assessment_type: 'assessment_type', consciousness: 'consciousness',
    phase: 'phase', highest_item_score: 'highest_item_score', trigger_items: 'trigger_items',
    care_priority: 'care_priority', nursing_problems: 'nursing_problems',
    nursing_measures_confirmed: 'nursing_measures_confirmed', include_family: 'include_family',
    eligibility: 'eligibility', eligibility_criteria: 'eligibility_criteria',
    sas_na_reason: 'sas_na_reason', sleep: 'sleep', appetite: 'appetite',
    nausea: 'nausea', gi_sas: 'gi_sas', dyspnea: 'dyspnea', fatigue: 'fatigue',
    pain_sas: 'pain_sas', pain: 'pain', gi: 'gi', edema: 'edema', oral: 'oral',
    body: 'body', turn: 'turn', accept: 'accept', prep: 'prep', grief: 'grief'
  },
  // 目前 encounter_id = DateTime（入院起始時間）；admitted_at 尚不存在，不得送出。
  dateTimeFields: ['encounter_id', 'saved_at'],
  // 當 SharePoint 欄位型態與上述建議不同時，需資訊端一起調整 serializer。
  numberFields: ['data_schema_version','phase','include_family','eligibility','sleep','appetite','nausea','gi_sas','dyspnea','fatigue','pain_sas','pain','gi','edema','oral','body','turn','accept','prep','grief'],
  // 預設僅允許 TEST- 虛構資料；即使成功串接也不等於正式臨床核准。
  testOnly: true
});
