import instance from './axios';

export async function getProgramById(item, token){

  let program = await instance.get(`/daily_irrigation_program/${item.program}`, {
    headers:{
      Authorization: `Token ${token.token}`
    }
  });

  item.p_program_type = await program.data.program_type;
  item.p_farm = await program.data.farm;
  item.p_rand = await program.data.rand;
  item.p_index = await program.data.index;
  item.p_to_faro = await program.data.to_faro;
  item.p_from_faro = await program.data.from_faro;
  item.p_start_time = program.data.start_time;
  item.p_end_time = program.data.end_time;
  item.p_created_at = program.data.created_at;

  return item;

}
