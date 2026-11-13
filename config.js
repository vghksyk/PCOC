// 公開識別碼，不是 Client Secret。部署前請資訊室確認 Client ID 是否為核准用於 PCOC 的最新 App。
// 重要：請勿在本檔案放入 Client Secret、密碼、Access Token 或病人資料。
window.PCOC_CONFIG = Object.freeze({
  clientId: '528719ff-4e80-49df-9e96-0e25bbda118f', // 先前收到的較新一組；需資訊室確認
  tenantId: '24de0681-c8f7-46e8-8da7-1f5b393d834d',
  redirectUri: 'https://vghksyk.github.io/PCOC/redirect.html',
  graphScope: 'Sites.Selected',
  siteId: '',           // 待資訊室提供，非 Secret
  listId: '',           // 待資訊室提供，非 Secret
  fieldMappingVerified: false, // 對照 SharePoint Internal Name 和型態後才改 true
  fieldMap: { // 左邊是本網頁輸出欄位，右邊填 SharePoint 真正 Internal Name
    record_id: 'record_id', saved_at: 'saved_at', app_version: 'app_version',
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
  // 當 SharePoint 欄位型態與上述建議不同時，需資訊端一起調整 serializer。
  numberFields: ['data_schema_version','phase','include_family','eligibility','sleep','appetite','nausea','gi_sas','dyspnea','fatigue','pain_sas','pain','gi','edema','oral','body','turn','accept','prep','grief'],
  // 預設僅允許 TEST- 虛構資料；即使成功串接也不等於正式臨床核准。
  testOnly: true
});
