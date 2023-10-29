import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089; // Replace with your app_id or leave the current one for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

const activeSymbolsResponse = async (res) => {
  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    console.log('Error : ', data.error?.message);
    connection.removeEventListener('message', activeSymbolsResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'active_symbols') {
    console.log(data.active_symbols);
  }

  connection.removeEventListener('message', activeSymbolsResponse, false);
};
  
  const ticksHistoryResponse = async (res) => {
    const data = JSON.parse(res.data);
    if (data.error !== undefined) {
      console.log('Error : ', data.error.message);
      connection.removeEventListener('message', ticksHistoryResponse, false);
      await api.disconnect();
    }
    if (data.msg_type === 'history') {
      console.log(data.history);
    }
    connection.removeEventListener('message', ticksHistoryResponse, false);
  };
  
  const ticksResponse = async (res) => {
    const data = JSON.parse(res.data);
    // This example returns an object with a selected amount of past ticks.
    if (data.error !== undefined) {
      console.log('Error : ', data.error.message);
      connection.removeEventListener('message', ticksResponse, false);
      await api.disconnect();
    }
    // Allows you to monitor ticks.
    if (data.msg_type === 'tick') {
      console.log(data.tick);
    }
  };

export const getActiveSymbols = async () => {
    // Currently gets all available symbols.
    const active_symbols_request = {
        // landing_company: "maltainvest",
        active_symbols: 'brief',
        product_type: 'basic',
    };
  connection.addEventListener('message', activeSymbolsResponse);
  await api.activeSymbols(active_symbols_request);
};
    
  // todo: ticks_history_request and ticks_request arg shouldn't be hardcoded and shoudl come from ui input instead (i.e. dropdown_)
  // export const subscribeTicks = async (ticks_request) => {
export const subscribeTicks = async (ticks_request) => {
  connection.addEventListener('message', ticksResponse);
  await api.subscribe({
    ...ticks_request,
    subscribe: 1,
  });
};

export const unsubscribeTicks = async (ticks_request) => {
  connection.removeEventListener('message', ticksResponse, false);
  await api.subscribe({
    ...ticks_request,
    subscribe: 1,
  }).unsubscribe();
};

export const getTicksHistory = async () => {
  connection.addEventListener('message', ticksHistoryResponse);
  await api.ticksHistory({
    ticks_history: 'R_50',
    adjust_start_time: 1,
    count: 10,
    end: 'latest',
    start: 1,
    style: 'ticks',
  });
};
