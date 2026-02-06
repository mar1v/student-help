import { requestService } from "../request.service";

jest.mock("../../models/Request", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    countDocuments: jest.fn(),
  },
}));

const RequestModel = require("../../models/Request").default;

describe("requestService.getList (unit)", () => {
  beforeEach(() => {
    (RequestModel.find as jest.Mock).mockImplementation(() => ({
      populate: () => ({
        sort: () => ({
          skip: () => ({
            limit: () => ({
              lean: async () => [
                {
                  _id: "1",
                  title: "Test",
                  description: "desc",
                  subject: "math",
                  author: { name: "User" },
                },
              ],
            }),
          }),
        }),
      }),
    }));

    (RequestModel.countDocuments as jest.Mock).mockResolvedValue(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns items and pagination", async () => {
    const res = await requestService.getList({ page: 1, limit: 10 });
    expect(res).toHaveProperty("items");
    expect(res).toHaveProperty("pagination");
    expect(res.pagination.total).toBe(1);
    expect(res.items.length).toBe(1);
    expect(res.items[0].title).toBe("Test");
  });
});
