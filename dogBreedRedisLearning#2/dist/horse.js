"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHor = void 0;
function getHor() {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: 'Horse-1',
                    breed: 'american',
                },
                {
                    id: 2,
                    name: 'Horse-2',
                    breed: 'russian',
                },
                {
                    id: 3,
                    name: 'Horse-3',
                    breed: 'Indian',
                },
                {
                    id: 4,
                    name: 'Horse-4',
                    breed: 'nepali',
                },
                {
                    id: 4,
                    name: 'Horse-5',
                    breed: 'bali',
                },
                {
                    id: 4,
                    name: 'Horse-6',
                    breed: 'thailand',
                },
            ]);
        });
    });
}
exports.getHor = getHor;
//# sourceMappingURL=horse.js.map