import supabaseServiceRole from "./supabaseServiceRole";

const recordApiAnalytics = async (apiPath: string, calledBy: string) => {
  await supabaseServiceRole.rpc("record_api_call_analytics", {
    api_path: apiPath,
    called_by: calledBy,
  });
};

export default recordApiAnalytics;
