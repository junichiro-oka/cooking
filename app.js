$(document).ready(function() {
    // 料理のオプションを定義
    const options = `
        <option value="">---</option>
        <option value="オムライス">オムライス</option>
        <option value="パスタ">パスタ</option>
        <option value="ピリ辛豚丼">ピリ辛豚丼</option>
        <option value="豚バラ塩だれ丼">豚バラ塩だれ丼</option>
        <option value="豚肉とキャベツのめんつゆ甘辛丼">豚肉とキャベツのめんつゆ甘辛丼</option>
        <option value="豚肉と茄子の味噌炒め">豚肉と茄子の味噌炒め</option>
        <option value="ビビンバ">ビビンバ</option>
        <option value="きのこのガーリックライス">きのこのガーリックライス（＋トマトスープ）</option>
        <option value="親子丼">親子丼</option>
        <option value="豚肉の生姜焼き">豚肉の生姜焼き</option>
        <option value="甘辛ネギ玉豚丼">甘辛ネギ玉豚丼</option>
        <option value="鶏肉とネギのオイスター炒め">鶏肉とネギのオイスター炒め</option>
        <option value="ゴーヤチャンプル">ゴーヤチャンプル</option>
    `;

    // 各<select>タグにオプションを追加
    $('.recipeSelect').each(function() {
        $(this).append(options);
    });

    const ingredientsData = {
        オムライス:[
            { name: '卵', quantity: 4, unit: '個' },
            { name: 'ニンジン', quantity: 0.5, unit: '本' },
            { name: '玉ねぎ', quantity: 0.5, unit: '個' },
            { name: 'ベーコン切り落としタイプ', quantity: 80, unit: 'g' },
        ],
        パスタ:[
            { name: 'ベーコン角切りタイプ', quantity: 80, unit: 'g' },
            { name: 'しめじ', quantity: 100, unit: 'g' },
        ],
        ピリ辛豚丼: [
            { name: '豚ひき肉', quantity: 160, unit: 'g' },
            { name: 'ニラ', quantity: 1, unit: '束' },
            { name: '玉ねぎ', quantity: 1, unit: '個' },
            { name: '卵', quantity: 2, unit: '個' },
        ],
        豚バラ塩だれ丼: [
            { name: '豚バラ', quantity: 160, unit: 'g' },
            { name: '玉ねぎ', quantity: 1, unit: '個' },
            { name: 'しめじ', quantity: 100, unit: 'g' },
        ],
        豚肉とキャベツのめんつゆ甘辛丼: [
            { name: '豚バラ', quantity: 160, unit: 'g' },
            { name: 'キャベツ', quantity: 0.25, unit: '玉' },
        ],
        豚肉と茄子の味噌炒め: [
            { name: '豚バラ', quantity: 160, unit: 'g' },
            { name: '茄子', quantity: 3, unit: '本' },
            { name: 'ピーマン', quantity: 2, unit: '個' },
        ],
        ビビンバ: [
            { name: '豚ひき肉', quantity: 160, unit: 'g' },
            { name: 'ニンジン', quantity: 0.5, unit: '本' },
            { name: '小松菜', quantity: 1, unit: '株' },
            { name: 'キムチ', quantity: 200, unit: 'g' },
            { name: '卵', quantity: 2, unit: '個' },
            { name: 'もやし', quantity: 0.5, unit: '袋' },
        ],
        きのこのガーリックライス: [
            { name: '豚バラ', quantity: 160, unit: 'g' },
            { name: '舞茸', quantity: 1, unit: 'パック' },
            { name: 'ミニトマト', quantity: 8, unit: '個' },
        ],
        親子丼: [
            { name: '鶏肉', quantity: 140, unit: 'g' },
            { name: '卵', quantity: 3, unit: '個' },
            { name: '玉ねぎ', quantity: 0.5, unit: '個' },
        ],
        豚肉の生姜焼き: [
            { name: '豚ロース', quantity: 300, unit: 'g' },
            { name: 'キャベツ', quantity: 0.5, unit: '玉' },
        ],
        甘辛ネギ玉豚丼: [
            { name: '豚バラ', quantity: 160, unit: 'g' },
            { name: '玉ねぎ', quantity: 0.25, unit: '個' },
            { name: '卵', quantity: 2, unit: '個' },
            { name: 'ネギ', quantity: 2, unit: '本' },
        ],
        鶏肉とネギのオイスター炒め: [
            { name: '鶏肉', quantity: 140, unit: 'g' },
            { name: 'しいたけ', quantity: 2, unit: '本' },
            { name: '卵', quantity: 2, unit: '個' },
            { name: 'ネギ', quantity: 2, unit: '本' },
        ],
        ゴーヤチャンプル: [
            { name: '豚バラ', quantity: 160, unit: 'g' },
            { name: '木綿豆腐', quantity: 0.5, unit: '丁' },
            { name: '卵', quantity: 1, unit: '個' },
            { name: 'ゴーヤ', quantity: 1, unit: '本' },
        ],
    };

    $('#calculateIngredients').click(function() {
        const totalIngredients = {};

        $('.recipeSelect').each(function() {
            const selectedRecipe = $(this).val();

            if (selectedRecipe && ingredientsData[selectedRecipe]) {
                ingredientsData[selectedRecipe].forEach(function(ingredient) {
                    const name = ingredient.name;
                    const quantity = ingredient.quantity;
                    const unit = ingredient.unit;

                    if (totalIngredients[name]) {
                        totalIngredients[name].quantity += quantity;
                    } else {
                        totalIngredients[name] = { quantity, unit };
                    }
                });
            }
        });

        displayTotalIngredients(totalIngredients);
    });

    function displayTotalIngredients(totalIngredients) {
        const $totalIngredientsDiv = $('#totalIngredients');
        $totalIngredientsDiv.empty();

        for (const [name, details] of Object.entries(totalIngredients)) {
            $totalIngredientsDiv.append(`<p>${name}: ${details.quantity} ${details.unit}</p>`);
        }
    }

    $('#clearSelections').click(function() {
        $('.recipeSelect').val('');  // すべての<select>の選択をクリア
        $('#totalIngredients').empty();  // 材料の総数表示もクリア
    });
});
