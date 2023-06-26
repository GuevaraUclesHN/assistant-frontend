
export interface ApiResult {
    kind: string;
    result: {
      prediction: {
        topIntent: string;
        projectKind: string;
        intents: any[];
        entities: any[];
      };
    };
    query: string;
    // Otras propiedades de la respuesta si las hay
  }