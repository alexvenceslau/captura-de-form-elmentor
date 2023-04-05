<script type="text/javascript">
$ = jQuery;
var url_webhook = 'https://app.imobilead.me/integrate-api/integracoes/webhook/XXXXXXXXXXXXXXXX'; // // Altere esta url para a sua url própria
$(document).ready(function() {
    $(":submit").click(function(e){
      e.preventDefault();
      $form = $(this).parents('form');
      var formName = $form.attr('name');
	
      erro = '';
        $form.find('[required="required"]').each(function(){
            $campo = $(this);
            console.log($campo.val());
            if($campo.val() == ''){
                erro = 'Verifique os campos acima.';
                $campo.addClass('erro');
            }
        });
            

  
      if(erro == ''){
            var dados = {
                "nome": $form.find('input[name="form_fields[nome]"]').val(),
                "email": $form.find('input[name="form_fields[email]"]').val(),
                "telefone": $form.find('input[name="form_fields[telefone]"]').val()
            };
            
            if($form.find('[name="form_fields[produto_nome]"]').length > 0){
                dados['produto_nome'] = $form.find('[name="form_fields[produto_nome]"]').val();
            }else{
                dados['form_name'] = formName;
            }
            
            if($form.find('[name="form_fields[imovel]"]').length > 0){
                dados['observacao'] = 'cliente interessado no produto: '+$form.find('[name="form_fields[imovel]"]').val();
            }

            $.ajax(
                {
                type: "POST",
                contentType: "application/json",
                url: url_webhook,
                data: JSON.stringify(dados),
                success: function(txt) {
                    if(txt.message =='okay') {
                        console.log('Dados enviados com sucesso para Imobilead!');
                        $form.submit();
                    } else{
                        console.log('Erro ao enviar dados para Imobilead!');
                        $form.submit();
                    }
                    
                }
                }
            );

      }
  });
});
	</script>

