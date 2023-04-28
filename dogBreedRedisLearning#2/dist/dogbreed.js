"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDogs = void 0;
function getDogs() {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: 'Luna',
                    breed: 'Caucasian Shepherd',
                },
                {
                    id: 2,
                    name: 'Ralph',
                    breed: 'Husky',
                },
                {
                    id: 3,
                    name: 'tiger',
                    breed: 'Indian',
                },
                {
                    id: 4,
                    name: 'tomy',
                    breed: 'Indian',
                },
            ]);
        }, 1000);
    });
}
exports.getDogs = getDogs;
//# sourceMappingURL=dogbreed.js.map